// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './sidebar'; 
import Main from './Main';

const Dashboard = () => {
  return (
    <div>
      <DashboardNavbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: '15px' }}>
      {<Main />} 
      </main>
    </div>
  );
};

export default Dashboard;
