import React, {useState, useEffect} from 'react'
import {
    listEmployees, 
    deleteEmployee, 
    searchEmployeesByName, 
    searchEmployeeBySsn, 
    getEmployee // For EmpID search
} from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const [searchName, setSearchName] = useState('');
    const [searchSsn, setSearchSsn] = useState('');
    const [searchEmpId, setSearchEmpId] = useState('');
    const navigator = useNavigate()

    // Initial load and clear search results
    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch((error) => {
            console.error(error);
            setEmployees([]); // Clear on error
        })
        // Clear search fields when showing all
        setSearchName('');
        setSearchSsn('');
        setSearchEmpId('');
    }

    useEffect(() => {
        getAllEmployees();
    }, [])

    // --- Search Handlers ---
    const handleSearchByName = () => {
        if (searchName.trim()) {
            searchEmployeesByName(searchName).then(response => {
                setEmployees(response.data);
            }).catch(error => {
                console.error("Error searching by name:", error);
                setEmployees([]); // Clear results on error or not found
            });
        } else {
            getAllEmployees(); // Show all if search is empty
        }
        setSearchSsn(''); // Clear other searches
        setSearchEmpId('');
    };

    const handleSearchBySsn = () => {
        if (searchSsn.trim()) {
            searchEmployeeBySsn(searchSsn).then(response => {
                setEmployees([response.data]); // Put single result in an array
            }).catch(error => {
                console.error("Error searching by SSN:", error);
                setEmployees([]); // Clear results on error or not found
            });
        } else {
            getAllEmployees(); // Show all if search is empty
        }
        setSearchName(''); // Clear other searches
        setSearchEmpId('');
    };

    const handleSearchByEmpId = () => {
        if (searchEmpId.trim()) {
            getEmployee(searchEmpId).then(response => {
                setEmployees([response.data]); // Put single result in an array
            }).catch(error => {
                console.error("Error searching by EmpID:", error);
                setEmployees([]); // Clear results on error or not found
            });
        } else {
            getAllEmployees(); // Show all if search is empty
        }
        setSearchName(''); // Clear other searches
        setSearchSsn('');
    };

    // --- Navigation and Delete ---
    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees(); 
        }).catch(error =>{
            console.error(error);
        })
    }

    function viewEmployeeDetails(id) {
        navigator(`/employees/${id}/details`);
    }

    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
            
            {/* Search Section */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by Name..." 
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary mt-1" type="button" onClick={handleSearchByName}>Search Name</button>
                </div>
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by SSN..." 
                        value={searchSsn}
                        onChange={(e) => setSearchSsn(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary mt-1" type="button" onClick={handleSearchBySsn}>Search SSN</button>
                </div>
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by Emp ID..." 
                        value={searchEmpId}
                        onChange={(e) => setSearchEmpId(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary mt-1" type="button" onClick={handleSearchByEmpId}>Search ID</button>
                </div>
                 <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-secondary" onClick={getAllEmployees}>Show All Employees</button>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
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
                        <th>Actions</th>
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
                                <td>{employee.salary ? `$${parseFloat(employee.salary).toFixed(2)}` : ''}</td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.division}</td>
                                <td>{employee.hireDate}</td>
                                <td>
                                    <button className='btn btn-info btn-sm' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-secondary btn-sm' onClick={() => viewEmployeeDetails(employee.id)} style={{marginLeft: '10px'}}>View</button> 
                                    <button className='btn btn-danger btn-sm' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent