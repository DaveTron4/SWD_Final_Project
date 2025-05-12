package net.finalSWDProject.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeWithPayHistoryDto {
    // Fields from EmployeeDto
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String ssn;
    private BigDecimal salary; // Annual Salary
    private String jobTitle;
    private String division;
    private LocalDate hireDate;

    // Pay History
    private List<PayStatementDto> payHistory;
} 