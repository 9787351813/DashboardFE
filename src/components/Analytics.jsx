import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaChartLine, FaPercentage, FaUserCheck } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Analytics.css';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalEmployees: 50,
    attritionCount: 12,
    attritionRate: 8,
    activeEmployees: 40,
    averageMonthlyIncome: [],
    performanceRating: [],
    satisfactionRatings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dashboardbe-2.onrender.com/api/analytics', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token storage method as needed
          },
        });
        setAnalyticsData(response.data[0]); // Assuming response.data is an array and we need the first element
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ['HR', 'Sales', 'Engineering', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Active Employees & Attrition Count',
        data: [75, 85, 90, 80, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Monthly Income by Job Role',
        data: [6500, 5900, 8000, 8100, 5600, 5500],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [
      {
        label: 'Performance Rating',
        data: [30, 45, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Analytics</h2>
      <div className="analytics-container">
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaUsers className="imc icon-total-employees" />
              <h5>Total Employees</h5>
              <p>{analyticsData.totalEmployees}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaChartLine className="imc icon-attrition-count" />
              <h5>Attrition Count</h5>
              <p>{analyticsData.attritionCount}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaPercentage className="imc icon-attrition-rate" />
              <h5>Attrition Rate</h5>
              <p>{analyticsData.attritionRate}%</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaUserCheck className="imc icon-active-employees" />
              <h5>Active Employees</h5>
              <p>{analyticsData.activeEmployees}</p>
            </div>
          </div>
        </div>
        {/* Row 2: Charts */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="chart-container">
              <Line data={lineData} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="chart-container">
              <Bar data={barData} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="chart-container">
              <Doughnut data={pieData} />
            </div>
          </div>
          <div className="col-md-4">
          <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Job Role</th>
                    <th>Satisfaction Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Developer</td>
                    <td>4.5</td>
                  </tr>
                  <tr>
                    <td>Designer</td>
                    <td>4.2</td>
                  </tr>
                  <tr>
                    <td>Manager</td>
                    <td>4.0</td>
                  </tr>
                  <tr>
                    <td>HR</td>
                    <td>3.8</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
