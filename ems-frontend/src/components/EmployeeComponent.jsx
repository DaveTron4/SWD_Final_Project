import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [ssn, setSsn] = useState('')
    const [salary, setSalary] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [division, setDivision] = useState('')
    const [hireDate, setHireDate] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        ssn: '',
        salary: '',
        jobTitle: '',
        division: '',
        hireDate: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id) {
            getEmployee(id).then((response) => {
                const emp = response.data;
                setFirstName(emp.firstName);
                setLastName(emp.lastName);
                setEmail(emp.email);
                setSsn(emp.ssn || ''); // Handle null/undefined
                setSalary(emp.salary || '');
                setJobTitle(emp.jobTitle || '');
                setDivision(emp.division || '');
                setHireDate(emp.hireDate || '');
            }).catch (error =>{
                console.error(error);
            })
        }

    },[id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            // Ensure salary is a number or null, and SSN has no dashes
            const formattedSsn = ssn.replace(/-/g, '');
            const formattedSalary = salary === '' ? null : parseFloat(salary);

            const employee = { 
                firstName, 
                lastName, 
                email, 
                ssn: formattedSsn, 
                salary: formattedSalary, 
                jobTitle, 
                division, 
                hireDate 
            };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                    // Handle potential validation errors from backend?
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                    // Handle potential validation errors from backend?
                })
            }
    
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { 
            firstName: '', lastName: '', email: '', ssn: '', 
            salary: '', jobTitle: '', division: '', hireDate: '' 
        };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (!email.trim()) { // Basic email format check could be added
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        if (!ssn.trim()) {
            errorsCopy.ssn = 'SSN is required';
            valid = false;
        } else if (!/^\d{9}$/.test(ssn.replace(/-/g, ''))) { // Validate 9 digits, allow optional dashes during input
             errorsCopy.ssn = 'SSN must be 9 digits';
             valid = false;
        }
        if (salary === '' || isNaN(parseFloat(salary)) || parseFloat(salary) < 0) {
            errorsCopy.salary = 'Valid salary is required (must be a non-negative number)';
            valid = false;
        }
        if (!jobTitle.trim()) {
            errorsCopy.jobTitle = 'Job Title is required';
            valid = false;
        }
        if (!division.trim()) {
            errorsCopy.division = 'Division is required';
            valid = false;
        }
        if (!hireDate.trim()) { // Basic date format check could be added
            errorsCopy.hireDate = 'Hire Date is required (YYYY-MM-DD)';
            valid = false;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(hireDate)) {
            errorsCopy.hireDate = 'Hire Date must be in YYYY-MM-DD format';
            valid = false;
        }


        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br/><br/>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        {/* First Name */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder='Enter Employee First Name'/>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        {/* Last Name */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder='Enter Employee Last Name'/>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        {/* Email */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input 
                                type="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder='Enter Employee Email'/>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                         {/* SSN */}
                         <div className='form-group mb-2'>
                            <label className='form-label'>SSN (9 digits):</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.ssn ? 'is-invalid' : ''}`}
                                value={ssn} 
                                onChange={(e) => setSsn(e.target.value)} 
                                placeholder='Enter 9 digit SSN (no dashes needed)'
                                maxLength="9" // Enforce length in input, validation handles format
                                />
                            {errors.ssn && <div className='invalid-feedback'>{errors.ssn}</div>}
                        </div>
                         {/* Salary */}
                         <div className='form-group mb-2'>
                            <label className='form-label'>Salary:</label>
                            <input 
                                type="number" 
                                step="0.01" // Allow decimals
                                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                value={salary} 
                                onChange={(e) => setSalary(e.target.value)} 
                                placeholder='Enter Annual Salary'/>
                            {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
                        </div>
                         {/* Job Title */}
                         <div className='form-group mb-2'>
                            <label className='form-label'>Job Title:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                                value={jobTitle} 
                                onChange={(e) => setJobTitle(e.target.value)} 
                                placeholder='Enter Job Title'/>
                            {errors.jobTitle && <div className='invalid-feedback'>{errors.jobTitle}</div>}
                        </div>
                        {/* Division */}
                        <div className='form-group mb-2'>
                            <label className='form-label'>Division:</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.division ? 'is-invalid' : ''}`}
                                value={division} 
                                onChange={(e) => setDivision(e.target.value)} 
                                placeholder='Enter Division'/>
                            {errors.division && <div className='invalid-feedback'>{errors.division}</div>}
                        </div>
                         {/* Hire Date */}
                         <div className='form-group mb-2'>
                            <label className='form-label'>Hire Date:</label>
                            <input 
                                type="date" // Use date input type
                                className={`form-control ${errors.hireDate ? 'is-invalid' : ''}`}
                                value={hireDate} 
                                onChange={(e) => setHireDate(e.target.value)} 
                                placeholder='YYYY-MM-DD'/>
                            {errors.hireDate && <div className='invalid-feedback'>{errors.hireDate}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                         <button className='btn btn-secondary' onClick={() => navigator('/employees')} style={{marginLeft: '10px'}}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent