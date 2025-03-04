// EmployeeForm.jsx
import React from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel, isEditing }) => {
  return (
    <div className='form-container'>
      <h2>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name : </label>
          <input
            value={employee.name}
            onChange={(e) => employee.setName(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label>Position : </label>
          <input
            value={employee.position}
            onChange={(e) => employee.setPosition(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label>Level : </label>
          <input
            value={employee.level}
            onChange={(e) => employee.setLevel(e.target.value)}
          ></input>
        </div>
        <div className="button-group">
          <button type="submit">{isEditing ? 'Save Changes' : 'Save'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;