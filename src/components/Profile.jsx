import React from 'react';
import './Profile.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>
      <div className="profile-content">
        <div className="profile-image-container">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/012/941/847/original/illustration-of-avatar-girl-nice-smiling-woman-with-black-hair-flat-icon-on-purple-background-vector.jpg" 
            alt="Profile" 
            className="profile-image"
          />
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label htmlFor="firstName">Name:</label>
            <input type="text" id="firstName" value="Oviya" readOnly />
          </div>
          <div className="profile-field">
            <label htmlFor="lastName">LastName:</label>
            <input type="text" id="lastName" value="S" readOnly />
          </div>
          <div className="profile-field">
            <label htmlFor="mobileNo">MobileNo:</label>
            <input type="text" id="mobileNo" value="9456712945" readOnly />
          </div>
          <div className="profile-field">
            <label htmlFor="jobRole">JobRole:</label>
            <input type="text" id="jobRole" value="Software Engineer" readOnly />
          </div>
          <div className="profile-field">
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" value="IT" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
