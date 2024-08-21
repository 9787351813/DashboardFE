import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import functionPlot from 'function-plot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reports.css';  // Custom CSS file
import axios from 'axios';

const ReportsPage = () => {
  const [reports, setReports] = useState({
    projectStatus: {},
    attendance: {},
    payroll: {},
    performance: {},
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://dashboardbe-2.onrender.com/api/reports'); 

        const reportsData = response.data;

        const projectStatus = reportsData.find(r => r.type === 'project-status');
        const attendance = reportsData.find(r => r.type === 'attendance');
        const payroll = reportsData.find(r => r.type === 'payroll');
        const performance = reportsData.find(r => r.type === 'performance');

        setReports({
          projectStatus: projectStatus ? projectStatus.data : {},
          attendance: attendance ? attendance.data : {},
          payroll: payroll ? payroll.data : {},
          performance: performance ? performance.data : {},
        });

        // Initialize function plot for performance evaluation
        functionPlot({
          target: '#performance-plot',
          width: 500,
          height: 300,
          data: [{
            fn: 'sin(x)', // Example function, change as per your requirement
            color: 'green'
          }]
        });
    
      } catch (error) {
        console.error('Error fetching reports data:', error);
      }
    };

    fetchReports();
  }, []);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Current Project Status',
        data: reports.projectStatus.labels || [12, 19, 3, 5, 2], // Default data
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barData = {
    labels: ['Present', 'Absent', 'Late', 'On Time'],
    datasets: [
      {
        label: 'Employee Attendance Report',
        data: reports.attendance.data || [30, 10, 5, 55], // Default data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  const pieData = {
    labels: ['Salary', 'Bonus', 'Deductions'],
    datasets: [
      {
        label: 'Payroll Summary',
        data: reports.payroll.data || [60, 25, 15], // Default data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reports</h2>
      <div className="report-container card p-4">
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Current Project Status</h5>
                <Line data={lineData} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Employee Attendance Report</h5>
                <Bar data={barData} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body pie-chart-container">
                <h5 className="card-title">Payroll Summary</h5>
                <div className="small-pie-chart">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Performance Evaluation</h5>
                <div id="performance-plot" className="chart-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
