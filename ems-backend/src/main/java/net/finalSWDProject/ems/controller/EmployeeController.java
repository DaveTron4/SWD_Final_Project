package net.finalSWDProject.ems.controller;


import org.springframework.web.bind.annotation.*;
import net.finalSWDProject.ems.service.EmployeeService;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import net.finalSWDProject.ems.dto.EmployeeDto;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import net.finalSWDProject.ems.dto.EmployeeWithPayHistoryDto;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    private EmployeeService employeeService;

    // Build Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);

        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    // Build Get Employee by ID REST API
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }


    // Build Get All Employees REST API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Build Update Employee REST API
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long id, @RequestBody EmployeeDto updatedEmployee) {
        EmployeeDto employeeDto = employeeService.updateEmployee(id, updatedEmployee);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Delete Employee REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully!");
    }

    // Build Search Employees by Name REST API
    @GetMapping("/search/name")
    public ResponseEntity<List<EmployeeDto>> searchEmployeesByName(@RequestParam("name") String name) {
        List<EmployeeDto> employees = employeeService.searchEmployeesByName(name);
        return ResponseEntity.ok(employees);
    }

    // Build Search Employee by SSN REST API
    @GetMapping("/search/ssn")
    public ResponseEntity<EmployeeDto> searchEmployeeBySsn(@RequestParam("ssn") String ssn) {
        EmployeeDto employeeDto = employeeService.searchEmployeeBySsn(ssn);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Conditional Salary Update REST API
    @PostMapping("/update-salary-conditional")
    public ResponseEntity<List<EmployeeDto>> applyConditionalSalaryIncrease(
            @RequestParam BigDecimal minSalary,
            @RequestParam BigDecimal maxSalary,
            @RequestParam double percentage) {
        List<EmployeeDto> updatedEmployees = employeeService.applyConditionalSalaryIncrease(minSalary, maxSalary, percentage);
        return ResponseEntity.ok(updatedEmployees);
    }

    // --- Report Endpoints --- 

    // Report 1: Employee Info with Pay History is partially covered by getEmployeeById.
    // A more specific endpoint/service method would be needed if 'pay history' is complex.

    // Report 2: Total Pay by Job Title REST API
    @GetMapping("/reports/salary-by-job-title")
    public ResponseEntity<Map<String, BigDecimal>> getTotalMonthlySalaryByJobTitle() {
        Map<String, BigDecimal> reportData = employeeService.getTotalMonthlySalaryByJobTitle();
        return ResponseEntity.ok(reportData);
    }

    // Report 3: Total Pay by Division REST API
    @GetMapping("/reports/salary-by-division")
    public ResponseEntity<Map<String, BigDecimal>> getTotalMonthlySalaryByDivision() {
        Map<String, BigDecimal> reportData = employeeService.getTotalMonthlySalaryByDivision();
        return ResponseEntity.ok(reportData);
    }

    // Report 1: Get Employee Info with Pay History
    @GetMapping("/{id}/pay-history")
    public ResponseEntity<EmployeeWithPayHistoryDto> getEmployeeWithPayHistory(@PathVariable("id") Long id) {
        EmployeeWithPayHistoryDto employeeDto = employeeService.getEmployeeWithPayHistory(id);
        return ResponseEntity.ok(employeeDto);
    }

}
