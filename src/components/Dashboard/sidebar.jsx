import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faUsers, 
  faCalendarAlt, 
  faChartLine, 
  faFileAlt, 
  faUserPlus, 
  faClipboardList, 
  faSignOutAlt,
  faBriefcase  // Add the icon for HR Management
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or session storage
    navigate('/register');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="header-title">HR MANAGEMENT</h2>
      </div>
      <ul>
        <li>
          <FontAwesomeIcon icon={faHouse} className="icon" />
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <Link to="/manageemployees"> Employees </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <Link to="/leaverequests">Leave Requests</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <Link to="/Attendance">Attendance</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartLine} className="icon" />
          <Link to="/performance-evaluations">Performance Evaluations</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <Link to="/recruitment">Recruitment Process</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faFileAlt} className="icon" />
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faFileAlt} className="icon" />
          <Link to="/analytics">Analytics</Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          <span onClick={handleLogout} className="logout-link">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
