import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import axios from 'axios';

// Register the necessary Chart.js components
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

const ChartComponent = () => {
    const [attendanceData, setAttendanceData] = useState({
        present: 0,
        absent: 0,
        late: 0
    });

    useEffect(() => {
        // Replace with your API endpoint
        axios.get('https://dashboardbe-4.onrender.com/api/attendance/data')
            .then(response => {
                setAttendanceData(response.data);
            })
            .catch(error => console.error('Error fetching attendance data:', error));
    }, []);

    const data = {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [
            {
                label: 'Number of Employees',
                data: [attendanceData.present, attendanceData.absent, attendanceData.late],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(255, 206, 86, 0.6)'  
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'purple' // Optional: Change legend text color to purple
                }
            },
            title: {
                display: true,
                text: 'Employee Attendance Status',
                color: 'purple', // Optional: Change title color to purple
                font: {
                    size: 18
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                },
                titleColor: 'purple', // Optional: Change tooltip title color
                bodyColor: 'purple'   // Optional: Change tooltip body color
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Employees',
                    color: 'purple', // Optional: Change y-axis title color
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: 'purple' // Optional: Change y-axis tick color
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Attendance Status',
                    color: 'purple', // Optional: Change x-axis title color
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    color: 'purple' // Optional: Change x-axis tick color
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default ChartComponent;
