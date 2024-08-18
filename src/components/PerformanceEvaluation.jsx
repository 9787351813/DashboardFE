import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PerformanceEvaluation.css'; 

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const PerformanceEvaluationDashboard = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Fetch performance data from backend
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/performance', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Assuming you store the token in local storage
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch performance data');
        }

        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, []);

  // Fallback data if no performanceData is available
  const defaultDepartmentBarData = {
    labels: ['HR', 'Sales', 'Engineering', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Department Performance',
        data: performanceData ? performanceData.departmentPerformance : [75, 85, 90, 80, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
      },
    ],
  };

  const defaultLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Over Time',
        data: performanceData ? performanceData.performanceOverTime : [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const defaultPieData = {
    labels: ['<$50K', '$50K-$100K', '$100K-$150K', '>$150K'],
    datasets: [
      {
        label: 'Employee Count by Salary Range',
        data: performanceData ? performanceData.salaryDistribution : [10, 30, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const employees = performanceData ? performanceData.employees : [
    { id: 1, name: 'John Doe', percentage: '75%', avatar: 'https://avatars.design/wp-content/uploads/2016/09/avatar1b.jpg', colorClass: 'performance-medium' },
    { id: 2, name: 'Jane Smith', percentage: '88%', avatar: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png', colorClass: 'performance-high' },
    { id: 3, name: 'Bob Johnson', percentage: '92%', avatar: 'https://cdn.vectorstock.com/i/1000v/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg', colorClass: 'performance-high' },
    { id: 4, name: 'Alice Brown', percentage: '70%', avatar: 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png', colorClass: 'performance-medium' },
    { id: 5, name: 'Charlie White', percentage: '85%', avatar: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png', colorClass: 'performance-high' },
    { id: 6, name: 'Oscar Walker', percentage: '75%', avatar: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Background.png', colorClass: 'performance-medium' },
  ];

  return (
    <div className="outer-container mt-5">
      <h2 className="text-center mb-5">Performance Evaluation</h2>
      <div className="row">
        {/* Left side: Department-wise Bar Chart */}
        <div className="col-md-8">
          <div className="chart-container">
            <Bar data={defaultDepartmentBarData}  />
          </div>
        </div>
        {/* Right side: Employee Boxes */}
        <div className="col-md-4">
          <div className="employee-boxes">
            {employees.map((employee) => (
              <div key={employee.id} className="card mb-3 p-2 text-center">
                <img src={employee.avatar} alt={employee.name} className="rounded-circle mb-2" />
                <h6>{employee.name}</h6>
                <p className={`percentage-badge ${employee.colorClass}`}>{employee.percentage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Below: Line Chart and Pie Chart */}
      <div className="row mt-5">
        <div className="col-md-8">
          <div className="line-chart-container">
            <Line data={defaultLineData} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="pie-chart-container">
            <Pie data={defaultPieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluationDashboard;
