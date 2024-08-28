import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import the CSS file

const ApplicationTable = ({ onSelect, onDelete }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('https://dashboardbe-4.onrender.com/api/recruitment')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the employees!", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://dashboardbe-4.onrender.com/api/recruitment/${id}`)
            .then(() => {
                setEmployees(employees.filter(emp => emp._id !== id));
                onDelete(id);
            })
            .catch(error => {
                console.error("There was an error deleting the employee!", error);
            });
    };

    const handleSelect = (employee) => {
        axios.patch(`https://dashboardbe-4.onrender.com/api/recruitment/${employee._id}`, { status: 'Selected' })
            .then(() => {
                onSelect(employee);
            })
            .catch(error => {
                console.error("There was an error updating the employee status!", error);
            });
    };

    return (
        <div className="table-container"> {/* Apply container styles */}
            <table>
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.status}</td>
                            <td>
                                <button onClick={() => handleSelect(employee)}>Select</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationTable;
