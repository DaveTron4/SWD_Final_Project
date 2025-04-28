import React, { useState, useEffect } from 'react';
import { getTotalSalaryByJobTitle, getTotalSalaryByDivision } from '../services/EmployeeService';

const ReportComponent = () => {
    const [salaryByJobTitle, setSalaryByJobTitle] = useState({});
    const [salaryByDivision, setSalaryByDivision] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = () => {
        setError(''); // Clear previous errors
        Promise.all([
            getTotalSalaryByJobTitle(),
            getTotalSalaryByDivision()
        ])
        .then(([jobTitleResponse, divisionResponse]) => {
            setSalaryByJobTitle(jobTitleResponse.data || {});
            setSalaryByDivision(divisionResponse.data || {});
        })
        .catch(err => {
            console.error("Error fetching reports:", err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch report data.');
            setSalaryByJobTitle({}); // Clear data on error
            setSalaryByDivision({});
        });
    };

    const renderTable = (title, data) => (
        <div className="col-md-6">
            <h4 className="text-center">{title}</h4>
            {Object.keys(data).length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>{title.includes('Job Title') ? 'Job Title' : 'Division'}</th>
                            <th>Total Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{`$${parseFloat(value).toFixed(2)}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No data available.</p>
            )}
        </div>
    );

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Salary Reports</h2>
            
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <div className="row">
                {renderTable('Total Salary by Job Title', salaryByJobTitle)}
                {renderTable('Total Salary by Division', salaryByDivision)}
            </div>
             <div className="text-center mt-3">
                 <button className="btn btn-secondary" onClick={fetchReports}>Refresh Reports</button>
             </div>
        </div>
    );
};

export default ReportComponent; 