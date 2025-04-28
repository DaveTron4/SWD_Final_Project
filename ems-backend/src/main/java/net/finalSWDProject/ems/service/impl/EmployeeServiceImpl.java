package net.finalSWDProject.ems.service.impl;

import net.finalSWDProject.ems.repository.EmployeeRepository;
import net.finalSWDProject.ems.dto.EmployeeDto;
import net.finalSWDProject.ems.entity.Employee;
import net.finalSWDProject.ems.exception.ResourceNotFoundException;
import net.finalSWDProject.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import net.finalSWDProject.ems.mapper.EmployeeMapper;
import net.finalSWDProject.ems.dto.PayStatementDto;
import net.finalSWDProject.ems.dto.EmployeeWithPayHistoryDto;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.math.RoundingMode;

import java.math.BigDecimal;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> 
                new ResourceNotFoundException("Employee not found with id: " + id));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployeeDto) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with id: " + id)
        );

        employee.setFirstName(updatedEmployeeDto.getFirstName());
        employee.setLastName(updatedEmployeeDto.getLastName());
        employee.setEmail(updatedEmployeeDto.getEmail());
        employee.setSsn(updatedEmployeeDto.getSsn()); // Assuming SSN updates are allowed
        employee.setSalary(updatedEmployeeDto.getSalary());
        employee.setJobTitle(updatedEmployeeDto.getJobTitle());
        employee.setDivision(updatedEmployeeDto.getDivision());
        employee.setHireDate(updatedEmployeeDto.getHireDate());
        
        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with id: " + id)
        );
        employeeRepository.delete(employee);
    }   

    @Override
    public List<EmployeeDto> searchEmployeesByName(String name) {
        // Split the search term to handle first/last name potentially
        // This is a simple approach; more sophisticated name searching could be added
        String searchTerm = name != null ? name.trim() : "";
        List<Employee> employees = employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(searchTerm, searchTerm);
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
            .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto searchEmployeeBySsn(String ssn) {
        Employee employee = employeeRepository.findBySsn(ssn)
            .orElseThrow(() -> 
                new ResourceNotFoundException("Employee not found with SSN: " + ssn));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    @Transactional
    public List<EmployeeDto> applyConditionalSalaryIncrease(BigDecimal minSalary, BigDecimal maxSalary, double percentage) {
        List<Employee> employeesToUpdate = employeeRepository.findBySalaryBetween(minSalary, maxSalary);
        BigDecimal multiplier = BigDecimal.valueOf(1 + percentage / 100.0);

        for (Employee employee : employeesToUpdate) {
            BigDecimal currentSalary = employee.getSalary();
            BigDecimal newSalary = currentSalary.multiply(multiplier).setScale(2, RoundingMode.HALF_UP);
            employee.setSalary(newSalary);
        }
        List<Employee> updatedEmployees = employeeRepository.saveAll(employeesToUpdate);
        return updatedEmployees.stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, BigDecimal> getTotalMonthlySalaryByJobTitle() {
        List<Object[]> results = employeeRepository.findTotalMonthlySalaryByJobTitle();
        // The result of SUM(salary/12) might be Double depending on DB.
        // Cast to BigDecimal for consistency, handle potential nulls.
        return results.stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0], // Key: Job Title
                        arr -> arr[1] == null ? BigDecimal.ZERO : new BigDecimal(arr[1].toString()).setScale(2, RoundingMode.HALF_UP) // Value: Sum of Monthly Salary
                ));
    }

    @Override
    public Map<String, BigDecimal> getTotalMonthlySalaryByDivision() {
        List<Object[]> results = employeeRepository.findTotalMonthlySalaryByDivision();
         return results.stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0], // Key: Division
                        arr -> arr[1] == null ? BigDecimal.ZERO : new BigDecimal(arr[1].toString()).setScale(2, RoundingMode.HALF_UP) // Value: Sum of Monthly Salary
                ));
    }

    // --- Report 1 Implementation ---
    @Override
    public EmployeeWithPayHistoryDto getEmployeeWithPayHistory(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        List<PayStatementDto> payHistory = generatePayHistory(employee);

        // Map Employee entity to EmployeeWithPayHistoryDto
        EmployeeWithPayHistoryDto dto = new EmployeeWithPayHistoryDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setSsn(employee.getSsn());
        dto.setSalary(employee.getSalary()); // Annual salary
        dto.setJobTitle(employee.getJobTitle());
        dto.setDivision(employee.getDivision());
        dto.setHireDate(employee.getHireDate());
        dto.setPayHistory(payHistory);

        return dto;
    }

    private List<PayStatementDto> generatePayHistory(Employee employee) {
        List<PayStatementDto> history = new ArrayList<>();
        if (employee.getHireDate() == null || employee.getSalary() == null || employee.getSalary().compareTo(BigDecimal.ZERO) <= 0) {
            return history; // Cannot generate history without hire date and positive salary
        }

        LocalDate startDate = employee.getHireDate();
        LocalDate endDate = LocalDate.now();
        YearMonth startMonth = YearMonth.from(startDate);
        YearMonth endMonth = YearMonth.from(endDate);

        BigDecimal monthlyGross = employee.getSalary().divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);
        // Placeholder calculations
        BigDecimal taxesRate = new BigDecimal("0.15"); // 15%
        BigDecimal deductionsRate = new BigDecimal("0.05"); // 5%

        YearMonth currentMonth = startMonth;
        while (!currentMonth.isAfter(endMonth)) {
            LocalDate payDate = currentMonth.atEndOfMonth();
            String payPeriod = currentMonth.toString(); // e.g., "2024-06"

            BigDecimal taxes = monthlyGross.multiply(taxesRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal deductions = monthlyGross.multiply(deductionsRate).setScale(2, RoundingMode.HALF_UP);
            BigDecimal netPay = monthlyGross.subtract(taxes).subtract(deductions);

            history.add(new PayStatementDto(payDate, payPeriod, monthlyGross, taxes, deductions, netPay));

            currentMonth = currentMonth.plusMonths(1);
        }

        return history;
    }
}