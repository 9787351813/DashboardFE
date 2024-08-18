import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Reports from './components/Reports';
import Analytics from './components/Analytics';
import './App.css';


function App() {
  return (

    <Router>
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
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/" element={<Register />} />
        </Routes>
    </Router>
  );
}

export default App;