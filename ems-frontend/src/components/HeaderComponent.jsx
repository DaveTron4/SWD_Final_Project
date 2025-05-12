import React from 'react'
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

const HeaderComponent = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/employees">Employee Management System</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/employees">Employees</NavLink>
                    </li>
                    <li className="nav-item">
                         <NavLink className="nav-link" activeClassName="active" to="/update-salary-conditional">Conditional Salary Update</NavLink>
                    </li>
                     <li className="nav-item">
                         <NavLink className="nav-link" activeClassName="active" to="/reports">Salary Reports</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default HeaderComponent