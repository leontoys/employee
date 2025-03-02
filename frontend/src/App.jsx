import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";


function App() {
  const baseUrl = ""//"http://localhost:5000"
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "", level: "" })
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showAddForm,setShowAddForm] = useState(false)

  //get all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${baseUrl}/employees`)
      setEmployees(response.data)
    }
    catch (error) {
      console.error(error)
    }

  }

  //add new employee
  const addEmployee = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/employees`, newEmployee)
      setEmployees(employees.concat(response.data))//add new employee
      setNewEmployee({ name: "", position: "", level: "" })
    } catch (error) {
      console.error(error)
    }
  }

  //edit employee
  const editEmployee = async (event) => {
    event.preventDefault()
    try {
      console.log("editing")
      const response = await axios.patch(`${baseUrl}/employees/${editingEmployee._id}`, editingEmployee)
      setEmployees(employees.map(emp => (emp._id === editingEmployee._id ? response.data : emp))); // Update the employee list
      setEditingEmployee(null)
    } catch (error) {
      console.error(error)
    }
  }

  //delete employee
  const deleteEmployee = async (id) => {
    event.preventDefault()
    try {
      const response = await axios.delete(`${baseUrl}/employees/${id}`)
      setEmployees(employees.filter(emp => (emp._id !== id)))
    } catch (error) {
      console.error(error)
    }
  }

  //get all employees - on page load
  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div>
      <h1>Employee Management App</h1>
      {showAddForm && (<div className='form-container'>
        <h2>Add New Employee</h2>
        <form onSubmit={addEmployee}>
          <div className='form-group'>
            <label>Name : </label>
            <input
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            ></input>
          </div>
          <div className='form-group'>
            <label>Position : </label>
            <input
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
            ></input>
          </div>
          <div className='form-group'>
            <label>Level : </label>
            <input
              value={newEmployee.level}
              onChange={(e) => setNewEmployee({ ...newEmployee, level: e.target.value })}
            ></input>
          </div>
          <button type="submit">Save</button>
          <button onClick={()=>{ setShowAddForm(false)
            setNewEmployee(null)}}>Cancel</button>
        </form>
      </div>)}
      {editingEmployee && (<div className='form-container'>
        <h2>Edit Employee</h2>
        <form onSubmit={editEmployee}>
          <div className='form-group'>
            <label>Name : </label>
            <input
              value={editingEmployee.name}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
            ></input>
          </div>
          <div className='form-group'>
            <label>Position : </label>
            <input
              value={editingEmployee.position}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
            ></input>
          </div>
          <div className='form-group'>
            <label>Level : </label>
            <input
              value={editingEmployee.level}
              onChange={(e) => setEditingEmployee({ ...editingEmployee, level: e.target.value })}
            ></input>
          </div>
          <button type="submit">Save Changes</button>
          <button onClick={()=>setEditingEmployee(null)}>Cancel</button>
        </form>
      </div>)}
      {!showAddForm && !editingEmployee && (<button onClick={()=>setShowAddForm(true)}>Add New Employee</button>)}
      <div>
        <h2>Employee List</h2>
        <table className='employee-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee=>(
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.level}</td>
                <td>
                  <button onClick={()=>setEditingEmployee(employee)}>Edit</button>
                  <button onClick={()=>deleteEmployee(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
