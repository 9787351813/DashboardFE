import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    personalInfo: '',
    contactDetails: '',
    jobRole: '',
    department: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://dashboardbe-4.onrender.com/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('https://dashboardbe-4.onrender.com/api/employees', newEmployee);
      setEmployees([...employees, response.data]);
      setNewEmployee({ name: '', personalInfo: '', contactDetails: '', jobRole: '', department: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`https://dashboardbe-4.onrender.com/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Employee Management</h1>
      <hr />
  
      <div className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            value={newEmployee.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="personalInfo"
            value={newEmployee.personalInfo}
            onChange={handleChange}
            placeholder="Personal Info"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="contactDetails"
            value={newEmployee.contactDetails}
            onChange={handleChange}
            placeholder="Contact Details"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="jobRole"
            value={newEmployee.jobRole}
            onChange={handleChange}
            placeholder="Job Role"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="department"
            value={newEmployee.department}
            onChange={handleChange}
            placeholder="Department"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
  
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Personal Info</th>
            <th>Contact Details</th>
            <th>Job Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) &&
            employees.map((employee) => (
              <tr key={employee._id}>
                <td className="employee-name">
                  <i className="fas fa-user user-icon"></i>
                  {employee.name}
                </td>
                <td>{employee.personalInfo}</td>
                <td>
                  <i className="fas fa-phone phone-icon text-success"></i>
                  {employee.contactDetails}
                </td>
                <td>
                  <i className="fas fa-briefcase job-icon text-warning"></i>
                  {employee.jobRole}
                </td>
                <td>{employee.department}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};  

export default ManageEmployee;
