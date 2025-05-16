import React, { useState, useEffect } from 'react';
import {
  listEmployees,
  deleteEmployee,
  searchEmployeesByName,
  searchEmployeeBySsn,
  getEmployee,
} from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSsn, setSearchSsn] = useState('');
  const [searchEmpId, setSearchEmpId] = useState('');
  const navigator = useNavigate();

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
        setEmployees([]);
      });
    setSearchName('');
    setSearchSsn('');
    setSearchEmpId('');
  }

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleSearchByName = () => {
    if (searchName.trim()) {
      searchEmployeesByName(searchName)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error('Error searching by name:', error);
          setEmployees([]);
        });
    } else {
      getAllEmployees();
    }
    setSearchSsn('');
    setSearchEmpId('');
  };

  const handleSearchBySsn = () => {
    if (searchSsn.trim()) {
      searchEmployeeBySsn(searchSsn)
        .then((response) => {
          setEmployees([response.data]);
        })
        .catch((error) => {
          console.error('Error searching by SSN:', error);
          setEmployees([]);
        });
    } else {
      getAllEmployees();
    }
    setSearchName('');
    setSearchEmpId('');
  };

  const handleSearchByEmpId = () => {
    if (searchEmpId.trim()) {
      getEmployee(searchEmpId)
        .then((response) => {
          setEmployees([response.data]);
        })
        .catch((error) => {
          console.error('Error searching by EmpID:', error);
          setEmployees([]);
        });
    } else {
      getAllEmployees();
    }
    setSearchName('');
    setSearchSsn('');
  };

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewEmployeeDetails(id) {
    navigator(`/employees/${id}/details`);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employees List</h2>
      <div className="d-flex justify-content-end mb-3">
        {/* <button className="btn btn-primary" onClick={addNewEmployee}>
          Add Employee
        </button> */}
      </div>

      {/* Search Section */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button className="btn btn-outline-secondary mt-2 w-100" onClick={handleSearchByName}>
              Search Name
            </button>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by SSN..."
              value={searchSsn}
              onChange={(e) => setSearchSsn(e.target.value)}
            />
            <button className="btn btn-outline-secondary mt-2 w-100" onClick={handleSearchBySsn}>
              Search SSN
            </button>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Emp ID..."
              value={searchEmpId}
              onChange={(e) => setSearchEmpId(e.target.value)}
            />
            <button className="btn btn-outline-secondary mt-2 w-100" onClick={handleSearchByEmpId}>
              Search ID
            </button>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-stretch">
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
                Add Employee
            </button>
            <button className="btn btn-secondary" onClick={getAllEmployees}>
                Show All Employees
            </button>
        </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>SSN</th>
              <th>Salary</th>
              <th>Job Title</th>
              <th>Division</th>
              <th>Hire Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.ssn}</td>
                  <td>
                    {employee.salary ? `$${parseFloat(employee.salary).toFixed(2)}` : ''}
                  </td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.division}</td>
                  <td>{employee.hireDate}</td>
                  <td className="text-center">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => updateEmployee(employee.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => viewEmployeeDetails(employee.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
