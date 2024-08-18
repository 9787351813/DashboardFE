import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import './Attendance.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendancePage = () => {
  const initialEmployees = [
    { id: 1, name: 'John Doe', personalInfo: 'Lives in New York', contactDetails: '555-1234', jobRole: 'Software Engineer', department: 'IT', hireDate: '2021-01-01' },
    { id: 2, name: 'Jane Smith', personalInfo: 'Lives in Los Angeles', contactDetails: '555-5678', jobRole: 'Project Manager', department: 'Management', hireDate: '2021-02-01' },
    { id: 3, name: 'Alice Johnson', personalInfo: 'Lives in Chicago', contactDetails: '555-8765', jobRole: 'QA Engineer', department: 'Quality Assurance', hireDate: '2021-03-01' },
    { id: 5, name: 'Charlie Davis', personalInfo: 'Lives in Phoenix', contactDetails: '555-1111', jobRole: 'DevOps Engineer', department: 'IT', hireDate: '2021-05-01' },
    { id: 6, name: 'David Wilson', personalInfo: 'Lives in Philadelphia', contactDetails: '555-2222', jobRole: 'HR Manager', department: 'Human Resources', hireDate: '2021-06-01' },
    { id: 7, name: 'Eva Green', personalInfo: 'Lives in San Antonio', contactDetails: '555-3333', jobRole: 'QA Engineer', department: 'Marketing', hireDate: '2021-07-01' },
    { id: 8, name: 'Frank Thomas', personalInfo: 'Lives in San Diego', contactDetails: '555-4444', jobRole: 'DevOps Engineer', department: 'IT', hireDate: '2021-08-01' },
    { id: 9, name: 'Grace Lee', personalInfo: 'Lives in Dallas', contactDetails: '555-5555', jobRole: 'Sales Representative', department: 'Sales', hireDate: '2021-09-01' },
    { id: 10, name: 'Henry King', personalInfo: 'Lives in San Jose', contactDetails: '555-6666', jobRole: 'Software Engineer', department: 'IT', hireDate: '2021-10-01' },
    { id: 11, name: 'Ivy Clark', personalInfo: 'Lives in Austin', contactDetails: '555-7777', jobRole: 'DevOps Engineer', department: 'Marketing', hireDate: '2021-11-01' },
    { id: 12, name: 'Jack White', personalInfo: 'Lives in Jacksonville', contactDetails: '555-8888', jobRole: 'Software Engineer', department: 'Operations', hireDate: '2021-12-01' },
    { id: 13, name: 'Katie Black', personalInfo: 'Lives in Fort Worth', contactDetails: '555-9999', jobRole: 'Product Manager', department: 'IT', hireDate: '2022-01-01' },
    { id: 14, name: 'Leo Miller', personalInfo: 'Lives in Columbus', contactDetails: '555-0000', jobRole: 'Software Engineer', department: 'IT', hireDate: '2022-02-01' },
    { id: 15, name: 'Mia Harris', personalInfo: 'Lives in Charlotte', contactDetails: '555-1112', jobRole: 'Software Engineer', department: 'IT', hireDate: '2022-03-01' },
    { id: 16, name: 'Nina Young', personalInfo: 'Lives in San Francisco', contactDetails: '555-1113', jobRole: 'QA Engineer', department: 'IT', hireDate: '2022-04-01' },
    { id: 17, name: 'Oscar Walker', personalInfo: 'Lives in Indianapolis', contactDetails: '555-1114', jobRole: 'Content Writer', department: 'Operations', hireDate: '2022-05-01' },
    { id: 18, name: 'Paula Hall', personalInfo: 'Lives in Seattle', contactDetails: '555-1115', jobRole: 'QA Engineer', department: 'Operations', hireDate: '2022-06-01' },
    { id: 19, name: 'Quinn Allen', personalInfo: 'Lives in Denver', contactDetails: '555-1116', jobRole: 'SEO Specialist', department: 'Marketing', hireDate: '2022-07-01' },
    { id: 20, name: 'Ryan Scott', personalInfo: 'Lives in Washington', contactDetails: '555-1117', jobRole: 'QA Engineer', department: 'Operations', hireDate: '2022-08-01' },
  ];

  // Calculate the counts
  const totalEmployees = initialEmployees.length;
  const leaveTodayEmployees = initialEmployees.filter(emp => emp.department === 'IT');
  const lateComersEmployees = initialEmployees.filter(emp => emp.department === 'Marketing');

  const leaveTodayCount = leaveTodayEmployees.length;
  const lateComersCount = lateComersEmployees.length;

  const presentCount = totalEmployees - leaveTodayCount - lateComersCount;
  const onTimeCount = totalEmployees - leaveTodayCount - lateComersCount;

  // Pie chart data
  const leaveTodayData = {
    labels: ['Leave Today'],
    datasets: [
      {
        data: [leaveTodayCount],
        backgroundColor: ['#FF6384'], // Red for Leave Today
      },
    ],
  };

  const lateComersData = {
    labels: ['Late Comers'],
    datasets: [
      {
        data: [lateComersCount],
        backgroundColor: ['#FF9F40'], // Orange for Late Comers
      },
    ],
  };

  const presentData = {
    labels: ['Present'],
    datasets: [
      {
        data: [presentCount],
        backgroundColor: ['#36A2EB'], // Blue for Present
      },
    ],
  };

  const onTimeData = {
    labels: ['On-time'],
    datasets: [
      {
        data: [onTimeCount],
        backgroundColor: ['#4BC0C0'], // Teal for On-time
      },
    ],
  };

  // Department data
  const departments = ['IT', 'Management', 'Quality Assurance', 'Human Resources', 'Marketing', 'Sales', 'Operations'];
  const departmentCounts = departments.map(dept =>
    initialEmployees.filter(emp => emp.department === dept).length
  );

  const departmentData = {
    labels: departments,
    datasets: [
      {
        data: departmentCounts,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  return (
    <Container className="attendance-container">
      <h1 className="text-center my-4">Attendance</h1>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={3}>
          <Card className="attendance-card present-card">
            <Card.Body>
              <Card.Title>Present</Card.Title>
              <Pie data={presentData} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="attendance-card ontime-card">
            <Card.Body>
              <Card.Title>On-time</Card.Title>
              <Pie data={onTimeData} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="attendance-card latecomers-card">
            <Card.Body>
              <Card.Title>Late Comers</Card.Title>
              <Pie data={lateComersData} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="attendance-card leave-card">
            <Card.Body>
              <Card.Title>Leave Today</Card.Title>
              <Pie data={leaveTodayData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={6} md={4}>
          <Card className="attendance-card department-card">
            <Card.Body>
              <Card.Title>Department wise Attendance</Card.Title>
              <div className="large-pie-chart">
                <Pie data={departmentData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={6} md={5}>
          <Card className="attendance-card leave-today-card">
            <Card.Body>
              <Card.Title>Leave Today</Card.Title>
              <ListGroup>
                {leaveTodayEmployees.map(emp => (
                  <ListGroup.Item key={emp.id}>{emp.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={5}>
          <Card className="attendance-card late-comers-card">
            <Card.Body>
              <Card.Title>Late Comers</Card.Title>
              <ListGroup>
                {lateComersEmployees.map(emp => (
                  <ListGroup.Item key={emp.id}>{emp.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendancePage;
