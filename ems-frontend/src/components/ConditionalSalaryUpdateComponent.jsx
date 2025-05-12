import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyConditionalSalaryIncrease } from '../services/EmployeeService';

const ConditionalSalaryUpdateComponent = () => {
    const navigator = useNavigate();
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [percentage, setPercentage] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [updatedEmployees, setUpdatedEmployees] = useState([]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setUpdatedEmployees([]);

        // Basic validation
        if (!minSalary || !maxSalary || !percentage || 
            isNaN(parseFloat(minSalary)) || isNaN(parseFloat(maxSalary)) || isNaN(parseFloat(percentage)) ||
            parseFloat(minSalary) < 0 || parseFloat(maxSalary) < 0 || parseFloat(percentage) <= 0 ||
            parseFloat(minSalary) >= parseFloat(maxSalary) ) {
            setError('Please enter valid, non-negative numbers. Min Salary must be less than Max Salary. Percentage must be positive.');
            return;
        }

        applyConditionalSalaryIncrease(minSalary, maxSalary, percentage)
            .then(response => {
                const updatedList = response.data || [];
                setUpdatedEmployees(updatedList);
                if (updatedList.length > 0) {
                    setMessage(`${updatedList.length} employee(s) updated successfully.`);
                } else {
                    setMessage('No employees found within the specified salary range.');
                }
                // Optionally clear form fields (or keep them for reference)
                // setMinSalary('');
                // setMaxSalary('');
                // setPercentage('');
            })
            .catch(err => {
                console.error("Error applying conditional salary update:", err);
                setError(err.response?.data?.message || err.message || 'Failed to apply update.');
            });
    };

    const formatCurrency = (value) => {
        return value != null ? `$${parseFloat(value).toFixed(2)}` : 'N/A';
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='card col-md-8 offset-md-2'>
                    <button className='btn btn-link' onClick={() => navigator('/employees')} style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--primary-blue)', textDecoration: 'none' }}>&larr; Back to List</button>
                    <h2 className='text-center mt-3'>Apply Conditional Salary Increase</h2>
                    <div className='card-body'>
                        <form onSubmit={handleUpdate}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Minimum Salary ($):</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    className={`form-control ${error && (!minSalary || isNaN(parseFloat(minSalary)) || parseFloat(minSalary) < 0) ? 'is-invalid' : ''}`}
                                    value={minSalary}
                                    onChange={(e) => setMinSalary(e.target.value)}
                                    placeholder='e.g., 58000'
                                />
                            </div>
                             <div className='form-group mb-2'>
                                <label className='form-label'>Maximum Salary ($):</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    className={`form-control ${error && (!maxSalary || isNaN(parseFloat(maxSalary)) || parseFloat(maxSalary) <= parseFloat(minSalary)) ? 'is-invalid' : ''}`}
                                    value={maxSalary}
                                    onChange={(e) => setMaxSalary(e.target.value)}
                                    placeholder='e.g., 105000'
                                />
                            </div>
                             <div className='form-group mb-3'>
                                <label className='form-label'>Percentage Increase (%):</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                     className={`form-control ${error && (!percentage || isNaN(parseFloat(percentage)) || parseFloat(percentage) <= 0) ? 'is-invalid' : ''}`}
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    placeholder='e.g., 3.2'
                                />
                            </div>

                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            {message && <div className="alert alert-success" role="alert">{message}</div>}

                            {updatedEmployees.length > 0 && (
                                <div className="mt-4">
                                    <h4>Updated Employees:</h4>
                                    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                                        <table className="table table-sm table-bordered" style={{marginBottom: 0}}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>New Salary</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {updatedEmployees.map(emp => (
                                                    <tr key={emp.id}>
                                                        <td>{emp.id}</td>
                                                        <td>{emp.firstName} {emp.lastName}</td>
                                                        <td>{formatCurrency(emp.salary)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <button className='btn btn-primary mt-3' type="submit">Apply Increase</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConditionalSalaryUpdateComponent; 