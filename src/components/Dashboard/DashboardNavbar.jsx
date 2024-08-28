import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './DashboardNavbar.css';

const Navbar = () => {
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const [userData, setUserData] = useState({ firstName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  const toggleNotificationCard = () => {
    setShowNotificationCard(!showNotificationCard);
  };

  return (
    <div className="navbar">
      <h2 className='dashboard-title'>Dashboard</h2>
      <div className="navbar-right">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" aria-label="Search" />
        </div>
        <FontAwesomeIcon icon={faBell} className="notification-icon" onClick={toggleNotificationCard} />
        {showNotificationCard && (
          <div className="notification-card">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleNotificationCard} />
            <p>Notifications will be shown here</p>
          </div>
        )}
        <div className="avatar-container" onClick={() => navigate('/profile')}>
          <img src="https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="User Avatar" className="avatar" />
          <span className="welcome-message">Hi {userData.firstName || 'User'}</span>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
