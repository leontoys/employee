import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";


function App() {
  const baseUrl = "http://localhost:5000"
  const [employees,setEmployees] = useState([])

  const fetchEmployees = async()=>{
    try {
      const response = await axios.get(`${baseUrl}/employees`)
      setEmployees(response.data)    } 
    catch (error) {
      console.error(error)
    }

  }

  //get all employees
  useEffect(()=>{
    fetchEmployees()
  },[])

  return (
    <div>
      <h1>Employee Management App</h1>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee=>{ return (
          <li key={employee._id}>
            {employee.name} - {employee.position} - {employee.level}
          </li>
        )})}
      </ul>
    </div>
  )
}

export default App
