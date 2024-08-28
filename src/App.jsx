import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import Manageemployees from './components/Manageemployees';
import Attendance from './components/Attendance';
import LeaveRequest from './components/LeaveRequest';
import PerformanceEvaluation from './components/PerformanceEvaluation';
import RecruitmentProcess from './components/RecruitmentProcess';
import AddEmployeeForm from './components/AddEmployeeForm';
import SelectedList from './components/SelectedList';
import Reports from './components/Reports';
import DashboardCards from './components/DashboardCards';
import Chart from './components/Chart';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <Router>
      <div>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manageemployees" element={<Manageemployees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaverequests" element={<LeaveRequest />} />
          <Route path="/performance-evaluations" element={<PerformanceEvaluation />} />
          <Route path="/recruitment" element={<RecruitmentProcess />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-employee" element={<AddEmployeeForm />} /> {/* Route to Add Employee form */}
          <Route path="/selected-list" element={<SelectedList />} /> {/* Route to Selected List */}
          <Route path ="/dashboardcard" element={<DashboardCards />} />
          <Route path="/chart" element={<Chart />} />
          <Route path='/todolist' element={<TodoList />} />
          <Route path="/" element={<Register />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
