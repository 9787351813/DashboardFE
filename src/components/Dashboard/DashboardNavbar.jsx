import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import './DashboardNavbar.css';

const Navbar = () => {
  const [showNotificationCard, setShowNotificationCard] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or session storage
    navigate('/register');
  };

  const toggleNotificationCard = () => {
    setShowNotificationCard(!showNotificationCard);
  };

  return (
    <div className="navbar">
      <h2 className='Dashboard'>Dashboard</h2>
      <div className="navbar-right">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <FontAwesomeIcon icon={faBell} className="notification-icon" onClick={toggleNotificationCard} />
        {showNotificationCard && (
          <div className="notification-card">
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={toggleNotificationCard} />
            <p>Notifications will be shown here</p>
          </div>
        )}
        <div className="avatar-container" onClick={() => navigate('/profile')}>
          <img src="https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="Avatar" className="avatar" />
          <span className="welcome-message">Hi Oviya!</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
