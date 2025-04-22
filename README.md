# 📋 Employee Management System – Final Project

## 👥 Team Name: [Your Team Name]
**Team Members:**
- David Salas C.
- Chirag Dwivedi
- [Name 3]
- [Name 4]
- [Name 5]

---

## 📝 Project Description

This project is a **Minimal Working UX for a Basic Employee Management System** designed for Company '2'. The primary objective is to allow HR personnel to manage a small set of employees through a simple console or GUI (JavaFX) interface, connected to a MySQL database.

The system focuses on enabling data entry, updates, basic search, and the generation of key payroll and employee reports, without requiring user authentication or login functionality.

---

## 📚 User Story / Scenario

- The client has fewer than 20 full-time employees.
- There is one admin user who enters data into the database using MySQL scripts.
- The system should provide:
  - Report on full-time employee info with pay statement history.
  - Report on total monthly pay by job title.
  - Report on total monthly pay by division.
- Basic features required:
  - Add SSN column to employee table.
  - Search for employees by name, SSN, or employee ID.
  - Update employee records and salary based on a given percentage increase within a salary range.

---

## 📌 Features & Functional Requirements

1. **Insert New Employee Data**
2. **Search Employee** by name, SSN, or employee ID
3. **Update Employee Information**
4. **Apply Salary Increase** based on conditional range (e.g. 3.2% for $58K–$105K)
5. **Generate Reports**:
   - Full-time employee with pay statement history
   - Monthly pay by Job Title
   - Monthly pay by Division

---

## 📦 Deliverables

### 📁 Section A (Individual Submissions)
- ✅ Use Case Diagrams
  - Overall System
  - Reporting System
- ✅ Class Diagram (UML)
- ✅ Sequence Diagrams
  - Overall System
  - Reporting
- ✅ Report PDF (with TOC, diagrams, and breakdown of responsibilities)

### 💻 Section B (Group Submission)
- ✅ Java Console or JavaFX GUI application
- ✅ Java class design with interfaces, super/abstract classes, and collections
- ✅ Test Cases:
  - a) General employee update
  - b) Search functionality
  - c) Conditional salary update
- ✅ Software Design Document (SWDD) PDF
- ✅ Final project source code (zipped)
- ✅ Final video demo (7–15 min, MP4/MKV/etc.)

---

## 🏗️ Technologies & Tools

- Java (Console/JavaFX)
- MySQL
- JDBC
- Beaver (DB Diagram Tool)
- Draw.io (for UML diagrams)

---

## 🔄 Programming Tasks Breakdown

| Task ID | Task Description | Assigned To | Status |
|--------|------------------|-------------|--------|
| PT-1 | Insert New Employee | [Name] | ✅ |
| PT-2 | Search Employee by name/SSN/ID | [Name] | ✅ |
| PT-3 | Update Employee Info | [Name] | ✅ |
| PT-4 | Apply Salary Increase (based on % + range) | [Name] | ✅ |
| UML-1 | Use Case Diagram - System | [Name] | ✅ |
| UML-2 | Use Case Diagram - Reporting | David Salas C. | ✅ |
| UML-3 | Class Diagram | [Name] | ✅ |
| UML-4 | Sequence Diagram - System | [Name] | ✅ |
| UML-5 | Sequence Diagram - Reporting | [Name] | ✅ |

---

## ✅ Test Cases Overview

### Test Case A - Update Employee Info

| Input | Expected Output | Pass/Fail |
|-------|------------------|-----------|
| Update employee `empId = 123` address | Address is updated in DB | ✅ |

### Test Case B - Search Employee

| Input | Expected Output | Pass/Fail |
|-------|------------------|-----------|
| Search `SSN = 123456789` | Employee details are returned | ✅ |

### Test Case C - Conditional Salary Update

| Input | Range: 58K–105K, Increase: 3.2% | Output | Pass/Fail |
|-------|----------------------------------|--------|-----------|
| 3 employees fall in range | All salaries increase correctly | ✅ |

---

## 📽️ Final Demo Video

- **Link to video:** [Google Drive / YouTube Link Here]
- **Format:** MP4 / WebM / MOV

---

## 📄 Report (PDF)

- Includes:
  - TOC
  - Use Case Diagrams
  - Class Diagram
  - Sequence Diagrams
  - Programming Task Breakdown
  - Test Cases
  - Team Contributions

---

## 🗓️ Timeline (Key Dates)

| Task | Due Date |
|------|----------|
| Initial UML Diagrams | 04/25/2025 |
| Working Prototype | 04/28/2025 |
| Final Submission | 04/28/2025 |
| Group Video | 04/28/2025 |

---

## 📌 Notes

- No authentication or login functionality needed.
- All employee data handled in real-time using Java and MySQL.
- No hand-drawn diagrams allowed; all diagrams are digitally created.
- Ensure all deliverables are well-organized and zipped before submission.

---

## 🔗 Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JavaFX Docs](https://openjfx.io/)
- [JDBC Tutorial](https://docs.oracle.com/javase/tutorial/jdbc/)
- [Draw.io UML Tool](https://app.diagrams.net/)

---

