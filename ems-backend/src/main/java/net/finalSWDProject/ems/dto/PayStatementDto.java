package net.finalSWDProject.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayStatementDto {
    private LocalDate payDate;
    private String payPeriod;
    private BigDecimal grossPay;
    private BigDecimal taxes;
    private BigDecimal deductions;
    private BigDecimal netPay;
} 