package net.finalSWDProject.ems.service;

import java.util.List;
import java.math.BigDecimal;

import net.finalSWDProject.ems.dto.EmployeeDto;
import net.finalSWDProject.ems.dto.EmployeeWithPayHistoryDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long id);

    List<EmployeeDto> getAllEmployees();
    
    EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployee);

    void deleteEmployee(Long id);

    // Search methods
    List<EmployeeDto> searchEmployeesByName(String name);
    EmployeeDto searchEmployeeBySsn(String ssn); // Assuming SSN is unique

    // Conditional Salary Update
    List<EmployeeDto> applyConditionalSalaryIncrease(BigDecimal minSalary, BigDecimal maxSalary, double percentage);

    // Report methods
    EmployeeWithPayHistoryDto getEmployeeWithPayHistory(Long id); // Report 1
    java.util.Map<String, BigDecimal> getTotalMonthlySalaryByJobTitle(); // Report 2
    java.util.Map<String, BigDecimal> getTotalMonthlySalaryByDivision(); // Report 3
}
