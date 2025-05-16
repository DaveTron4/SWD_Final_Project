import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeWithPayHistory } from '../services/EmployeeService';

const EmployeeDetailComponent = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const [employeeData, setEmployeeData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    const fetchEmployeeDetails = () => {
        setError('');
        getEmployeeWithPayHistory(id)
            .then(response => {
                setEmployeeData(response.data);
            })
            .catch(err => {
                console.error("Error fetching employee details:", err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch employee details.');
                setEmployeeData(null);
            });
    };

    const formatCurrency = (value) => {
         return value != null ? `$${parseFloat(value).toFixed(2)}` : 'N/A';
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger" role="alert">{error}</div>;
    }

    if (!employeeData) {
        return <div className="container mt-4">Loading employee details...</div>;
    }

    const { payHistory, ...employee } = employeeData; // Separate employee details from history

    return (
        <div className='container mt-4'>
            <div className='card mb-4'>
            <button className='btn btn-link' onClick={() => navigator('/employees')} style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--primary-blue)', textDecoration: 'none' }}>&larr; Back to List</button>
                 <h3 className='card-header text-center'>Employee Information</h3>
                 <div className='card-body'>
                     <div className="row">
                         <div className="col-md-6">
                             <p><strong>ID:</strong> {employee.id}</p>
                             <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
                             <p><strong>Email:</strong> {employee.email}</p>
                             <p><strong>SSN:</strong> {employee.ssn}</p> 
                         </div>
                         <div className="col-md-6">
                             <p><strong>Job Title:</strong> {employee.jobTitle}</p>
                             <p><strong>Division:</strong> {employee.division}</p>
                             <p><strong>Hire Date:</strong> {employee.hireDate}</p>
                             <p><strong>Annual Salary:</strong> {formatCurrency(employee.salary)}</p>
                         </div>
                     </div>
                 </div>
            </div>

            <div className='card'>
                <h3 className='card-header text-center'>Calculated Pay Statement History</h3>
                 <div className='card-body'>
                    {payHistory && payHistory.length > 0 ? (
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Pay Period</th>
                                    <th>Pay Date</th>
                                    <th>Gross Pay</th>
                                    <th>Taxes (15%)</th>
                                    <th>Deductions (5%)</th>
                                    <th>Net Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payHistory.map((stmt, index) => (
                                    <tr key={index}>
                                        <td>{stmt.payPeriod}</td>
                                        <td>{stmt.payDate}</td>
                                        <td>{formatCurrency(stmt.grossPay)}</td>
                                        <td>{formatCurrency(stmt.taxes)}</td>
                                        <td>{formatCurrency(stmt.deductions)}</td>
                                        <td>{formatCurrency(stmt.netPay)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No pay history generated (check hire date and salary).</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailComponent; 