import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';
const REST_API_REPORTS_URL = 'http://localhost:8080/api/reports'; // Assuming reports might be under /api/reports or adjust if needed

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateEmployee = (id, employee) => axios.put(REST_API_BASE_URL + '/' + id, employee);

export const deleteEmployee = (id) => axios.delete(REST_API_BASE_URL + '/' + id);

export const searchEmployeesByName = (name) => axios.get(REST_API_BASE_URL + '/search/name', { params: { name } });

export const searchEmployeeBySsn = (ssn) => axios.get(REST_API_BASE_URL + '/search/ssn', { params: { ssn } });

export const applyConditionalSalaryIncrease = (minSalary, maxSalary, percentage) => 
    axios.post(REST_API_BASE_URL + '/update-salary-conditional', {}, { 
        params: { minSalary, maxSalary, percentage } 
    });

export const getTotalSalaryByJobTitle = () => axios.get(REST_API_BASE_URL + '/reports/salary-by-job-title');

export const getTotalSalaryByDivision = () => axios.get(REST_API_BASE_URL + '/reports/salary-by-division');

// Report 1: Get Employee with calculated pay history
export const getEmployeeWithPayHistory = (id) => axios.get(REST_API_BASE_URL + '/' + id + '/pay-history');