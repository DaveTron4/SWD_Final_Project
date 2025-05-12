import { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import EmployeeComponent from './components/EmployeeComponent'
import ConditionalSalaryUpdateComponent from './components/ConditionalSalaryUpdateComponent'
import ReportComponent from './components/ReportComponent'
import EmployeeDetailComponent from './components/EmployeeDetailComponent'

function App() {
  // const [count, setCount] = useState(0) // Not used currently

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* Employee CRUD */}
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />}/>
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
            <Route path="/employees/:id/details" element={<EmployeeDetailComponent />} />

            {/* New Features */}
            <Route path="/update-salary-conditional" element={<ConditionalSalaryUpdateComponent />} />
            <Route path="/reports" element={<ReportComponent />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
