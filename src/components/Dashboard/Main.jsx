import React, { useState, useEffect } from 'react';
import Navbar from './DashboardNavbar'; // Adjust the path based on your folder structure
import DashboardCards from '../DashboardCards'; 
import Chart from '../Chart';
import TodoList from '../TodoList';
import axios from 'axios';
import './Main.css'; // Import custom CSS

const Dashboard = () => {
    const [data, setData] = useState({
        totalEmployees: 0,
        totalAttendance: 0,
        totalLeaveRequests: 0,
        totalProjects: 0
    });

    useEffect(() => {
        axios.get('https://dashboardbe-4.onrender.com/api/main')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container-fluid mt-4">
                {/* Heading */}
                <h2 className="mb-4 purple-text">Admin!</h2>
                
                {/* 4 Cards in 1 Row */}
                <div className="row mb-4">
                    <div className="col-md-3 mb-4">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Total Employees</h5>
                                <p className="card-text purple-text">{data.totalEmployees}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Total Attendance</h5>
                                <p className="card-text purple-text">{data.totalAttendance}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Total Leave Requests</h5>
                                <p className="card-text purple-text">{data.totalLeaveRequests}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Total Projects</h5>
                                <p className="card-text purple-text">{data.totalProjects}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Chart and Todo List Containers */}
                <div className="content-container">
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <div className="chart-container">
                                <Chart />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="todo-container">
                                <TodoList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
