import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'; 

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [progressBarPercentage, setProgressBarPercentage] = useState(75); // Example percentage

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://dashboardbe-2.onrender.com/api/main', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Example data for charts
  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [5000, 7000, 8000, 6000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales Overview',
        data: [300, 500, 400, 600, 700],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1>WELCOME Admin!</h1>
          <h2>Oviya</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col sm={6} md={3}>
          <Card className="text-center total-box total-employees">
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <div>
                <i className="bi bi-person"></i> {/* Replace with your icon */}
                <h3>123</h3> {/* Replace with actual number */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="text-center total-box total-clients">
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <div>
                <i className="bi bi-person-check"></i> {/* Replace with your icon */}
                <h3>456</h3> {/* Replace with actual number */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="text-center total-box total-leave-requests">
            <Card.Body>
              <Card.Title>Total Leave Requests</Card.Title>
              <div>
                <i className="bi bi-calendar"></i> {/* Replace with your icon */}
                <h3>78</h3> {/* Replace with actual number */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card className="text-center total-box total-projects">
            <Card.Body>
              <Card.Title>Total Projects</Card.Title>
              <div>
                <i className="bi bi-briefcase"></i> {/* Replace with your icon */}
                <h3>35</h3> {/* Replace with actual number */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>



      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Bar data={barChartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <Line data={lineChartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
        <Card>
            <Card.Body>
              <Card.Title>Today Employees</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with actual employee data */}
                  <tr>
                    <td><img src="https://avatars.design/wp-content/uploads/2016/09/avatar1b.jpg" alt="Employee" width="50" /></td>
                    <td>John Doe</td>
                    <td>Developer</td>
                    <td>IT</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Today's Attendance Rate</Card.Title>
              <div style={{ width: '80px', height: '80px' }}>
                <CircularProgressbar value={progressBarPercentage} text={`${progressBarPercentage}%`} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
