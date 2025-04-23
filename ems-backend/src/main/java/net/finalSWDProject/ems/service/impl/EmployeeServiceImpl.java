package net.finalSWDProject.ems.service.impl;

import net.finalSWDProject.ems.repository.EmployeeRepository;
import net.finalSWDProject.ems.dto.EmployeeDto;
import net.finalSWDProject.ems.entity.Employee;
import net.finalSWDProject.ems.exception.ResourceNotFoundException;
import net.finalSWDProject.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import net.finalSWDProject.ems.mapper.EmployeeMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee); // Save the employee entity to the database

        // Logic to create an employee
        return EmployeeMapper.mapToEmployeeDto(savedEmployee); // Convert the saved entity back to DTO and return it
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> 
                new ResourceNotFoundException("Employee not found with id: " + id));
        return EmployeeMapper.mapToEmployeeDto(employee); // Convert the entity to DTO and return it
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)) // Convert each entity to DTO
            .collect(Collectors.toList()); // Collect the results into a list
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with id: " + id)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        
        Employee updatedEmployeeObj = employeeRepository.save(employee); // Save the updated entity to the database

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj); // Convert the updated entity back to DTO and return it
    }

    @Override
    public void deleteEmployee(Long id) {
        
        Employee employee = employeeRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Employee not found with id: " + id)
        );
        employeeRepository.delete(employee); // Delete the employee entity from the database
    }   
}