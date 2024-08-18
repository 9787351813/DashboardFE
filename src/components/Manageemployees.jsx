import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faPhone, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import './Manageemployees.css';

const initialEmployees = [
  { id: 1, name: 'John Doe', personalInfo: 'Lives in New York', contactDetails: '555-1234', jobRole: 'Software Engineer', department: 'IT', hireDate: '2021-01-01' },
  { id: 2, name: 'Jane Smith', personalInfo: 'Lives in Los Angeles', contactDetails: '555-5678', jobRole: 'Project Manager', department: 'Management', hireDate: '2021-02-01' },
  { id: 3, name: 'Alice Johnson', personalInfo: 'Lives in Chicago', contactDetails: '555-8765', jobRole: 'QA Engineer', department: 'Quality AssuranceITBusiness', hireDate: '2021-04-01' },
  { id: 5, name: 'Charlie Davis', personalInfo: 'Lives in Phoenix', contactDetails: '555-1111', jobRole: 'DevOps Engineer', department: 'IT', hireDate: '2021-05-01' },
  { id: 6, name: 'David Wilson', personalInfo: 'Lives in Philadelphia', contactDetails: '555-2222', jobRole: 'HR Manager', department: 'Human Resources', hireDate: '2021-06-01' },
  { id: 7, name: 'Eva Green', personalInfo: 'Lives in San Antonio', contactDetails: '555-3333', jobRole: 'QA Engineer', department: 'Marketing', hireDate: '2021-07-01' },
  { id: 8, name: 'Frank Thomas', personalInfo: 'Lives in San Diego', contactDetails: '555-4444', jobRole: 'DevOps Engineer', department: 'IT', hireDate: '2021-08-01' },
  { id: 9, name: 'Grace Lee', personalInfo: 'Lives in Dallas', contactDetails: '555-5555', jobRole: 'Sales Representative', department: 'Sales', hireDate: '2021-09-01' },
  { id: 10, name: 'Henry King', personalInfo: 'Lives in San Jose', contactDetails: '555-6666', jobRole: 'Software Engineer', department: 'IT', hireDate: '2021-10-01' },
  { id: 11, name: 'Ivy Clark', personalInfo: 'Lives in Austin', contactDetails: '555-7777', jobRole: 'DevOps Engineer', department: 'Marketing', hireDate: '2021-11-01' },
  { id: 12, name: 'Jack White', personalInfo: 'Lives in Jacksonville', contactDetails: '555-8888', jobRole: 'Software Engineer', department: 'Operations', hireDate: '2021-12-01' },
  { id: 13, name: 'Katie Black', personalInfo: 'Lives in Fort Worth', contactDetails: '555-9999', jobRole: 'Product Manager', department: 'IT', hireDate: '2022-01-01' },
  { id: 14, name: 'Leo Miller', personalInfo: 'Lives in Columbus', contactDetails: '555-0000', jobRole: 'Software Engineer', department: 'IT', hireDate: '2022-02-01' },
  { id: 15, name: 'Mia Harris', personalInfo: 'Lives in Charlotte', contactDetails: '555-1112', jobRole: 'Software Engineer', department: 'IT', hireDate: '2022-03-01' },
  { id: 16, name: 'Nina Young', personalInfo: 'Lives in San Francisco', contactDetails: '555-1113', jobRole: 'QA Engineer', department: 'IT', hireDate: '2022-04-01' },
  { id: 17, name: 'Oscar Walker', personalInfo: 'Lives in Indianapolis', contactDetails: '555-1114', jobRole: 'Content Writer', department: 'Operations', hireDate: '2022-05-01' },
  { id: 18, name: 'Paula Hall', personalInfo: 'Lives in Seattle', contactDetails: '555-1115', jobRole: 'QA Engineer', department: 'Operations', hireDate: '2022-06-01' },
  { id: 19, name: 'Quinn Allen', personalInfo: 'Lives in Denver', contactDetails: '555-1116', jobRole: 'SEO Specialist', department: 'Marketing', hireDate: '2022-07-01' },
  { id: 20, name: 'Ryan Scott', personalInfo: 'Lives in Washington', contactDetails: '555-1117', jobRole: 'QA Engineer', department: 'Operations', hireDate: '2022-08-01' },

];

const ManageEmployees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    personalInfo: '',
    contactDetails: '',
    jobRole: '',
    department: '',
    hireDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    for (const key in newEmployee) {
      if (!newEmployee[key]) {
        setError(`Error: ${key} is required.`);
        return;
      }
    }

    setError('');
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({
      name: '',
      personalInfo: '',
      contactDetails: '',
      jobRole: '',
      department: '',
      hireDate: '',
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const employee = employees.find(emp => emp.name.toLowerCase() === e.target.value.toLowerCase());
    setSelectedEmployee(employee);
  };

  return (
    <div className="container mt-5">
      <h1> Employees</h1>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="employee-form mb-5">
        <h2>Add New Employee</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="personalInfo"
              className="form-control"
              placeholder="Personal Info"
              value={newEmployee.personalInfo}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="contactDetails"
              className="form-control"
              placeholder="Contact Details"
              value={newEmployee.contactDetails}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="jobRole"
              className="form-control"
              placeholder="Job Role"
              value={newEmployee.jobRole}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Department"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="hireDate"
              className="form-control"
              placeholder="Hire Date"
              value={newEmployee.hireDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100" onClick={handleAddEmployee}>
              Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="search-container mb-4">
        <div className="input-group">
          <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search employees..." 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
      </div>

      {selectedEmployee && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{selectedEmployee.name}</h5>
            <p className="card-text"><strong>Personal Info:</strong> {selectedEmployee.personalInfo}</p>
            <p className="card-text"><strong>Contact Details:</strong> {selectedEmployee.contactDetails}</p>
            <p className="card-text"><strong>Job Role:</strong> {selectedEmployee.jobRole}</p>
            <p className="card-text"><strong>Department:</strong> {selectedEmployee.department}</p>
            <p className="card-text"><strong>Hire Date:</strong> {selectedEmployee.hireDate}</p>
          </div>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Personal Info</th>
            <th>Contact Details</th>
            <th>Job Role</th>
            <th>Department</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td className="employee-name">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                {employee.name}
              </td>
              <td>{employee.personalInfo}</td>
              <td>
                <FontAwesomeIcon icon={faPhone} className="phone-icon" />
                {employee.contactDetails}
              </td>
              <td>
                <FontAwesomeIcon icon={faBriefcase} className="job-icon" />
                {employee.jobRole}
              </td>
              <td>{employee.department}</td>
              <td>{employee.hireDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;
