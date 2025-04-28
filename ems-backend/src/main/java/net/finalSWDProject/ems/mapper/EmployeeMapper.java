package net.finalSWDProject.ems.mapper;

import net.finalSWDProject.ems.dto.EmployeeDto;
import net.finalSWDProject.ems.entity.Employee;

public class EmployeeMapper {
    
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail(),
            employee.getSsn(),
            employee.getSalary(),
            employee.getJobTitle(),
            employee.getDivision(),
            employee.getHireDate()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
            employeeDto.getId(),
            employeeDto.getFirstName(),
            employeeDto.getLastName(),
            employeeDto.getEmail(),
            employeeDto.getSsn(),
            employeeDto.getSalary(),
            employeeDto.getJobTitle(),
            employeeDto.getDivision(),
            employeeDto.getHireDate()
        );
    }

}