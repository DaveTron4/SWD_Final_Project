package net.finalSWDProject.ems.repository;

import net.finalSWDProject.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Search by name (case-insensitive, partial match)
    List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);

    // Search by SSN (exact match)
    Optional<Employee> findBySsn(String ssn);

    // Find employees within a salary range for update
    List<Employee> findBySalaryBetween(BigDecimal minSalary, BigDecimal maxSalary);

    // Report: Group by Job Title and sum *monthly* salaries (assuming salary is annual)
    @Query("SELECT e.jobTitle, SUM(e.salary / 12) FROM Employee e GROUP BY e.jobTitle")
    List<Object[]> findTotalMonthlySalaryByJobTitle();

    // Report: Group by Division and sum *monthly* salaries (assuming salary is annual)
    @Query("SELECT e.division, SUM(e.salary / 12) FROM Employee e GROUP BY e.division")
    List<Object[]> findTotalMonthlySalaryByDivision();
}