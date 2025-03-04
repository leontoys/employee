// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const baseUrl =  "" //"http://localhost:5001" // ""; //
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", position: "", level: "" });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${baseUrl}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/employees`, newEmployee);
      setEmployees(employees.concat(response.data));
      setNewEmployee({ name: "", position: "", level: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editEmployee = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`${baseUrl}/employees/${editingEmployee._id}`, editingEmployee);
      setEmployees(employees.map(emp => (emp._id === editingEmployee._id ? response.data : emp)));
      setEditingEmployee(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/employees/${id}`);
      setEmployees(employees.filter(emp => (emp._id !== id)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management App</h1>
      {showAddForm && (
        <EmployeeForm
          employee={{
            name: newEmployee.name,
            position: newEmployee.position,
            level: newEmployee.level,
            setName: (value) => setNewEmployee({ ...newEmployee, name: value }),
            setPosition: (value) => setNewEmployee({ ...newEmployee, position: value }),
            setLevel: (value) => setNewEmployee({ ...newEmployee, level: value }),
          }}
          onSubmit={addEmployee}
          onCancel={() => setShowAddForm(false)}
          isEditing={false}
        />
      )}
      {editingEmployee && (
        <EmployeeForm
          employee={{
            name: editingEmployee.name,
            position: editingEmployee.position,
            level: editingEmployee.level,
            setName: (value) => setEditingEmployee({ ...editingEmployee, name: value }),
            setPosition: (value) => setEditingEmployee({ ...editingEmployee, position: value }),
            setLevel: (value) => setEditingEmployee({ ...editingEmployee, level: value }),
          }}
          onSubmit={editEmployee}
          onCancel={() => setEditingEmployee(null)}
          isEditing={true}
        />
      )}
      {!showAddForm && !editingEmployee && (
        <button onClick={() => setShowAddForm(true)}>Add New Employee</button>
      )}
      <EmployeeList
        employees={employees}
        onEdit={setEditingEmployee}
        onDelete={deleteEmployee}
      />
    </div>
  );
}

export default App;