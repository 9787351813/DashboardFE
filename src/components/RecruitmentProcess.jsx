import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import './RecruitmentProcess.css'; // Assuming you save the CSS as this file

const RecruitmentProcess = () => {
  // Data for the charts
  const barData = {
    labels: ['Social Media', 'Ad', 'Referral', 'Career Site', 'Agency'],
    datasets: [
      {
        label: 'Applications',
        backgroundColor: '#007bff',
        data: [120, 80, 60, 40, 20],
      },
    ],
  };

  const pieData = {
    labels: ['Engineering', 'Marketing', 'HR', 'Sales'],
    datasets: [
      {
        label: 'Open Positions',
        backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
        data: [10, 8, 5, 7],
      },
    ],
  };

  const horizontalBarData = {
    labels: ['Applied', 'Shortlisted', 'Interviewed', 'Hired'],
    datasets: [
      {
        label: 'Candidates',
        backgroundColor: '#17a2b8',
        data: [200, 120, 60, 18],
      },
    ],
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-5">Recruitment Process</h2>
      <Row>
        <Col md={3}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title>Total Applicants</Card.Title>
              <Card.Text>50</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title>Shortlisted Candidates</Card.Title>
              <Card.Text>42</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title>Hired Candidates</Card.Title>
              <Card.Text>18</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4 custom-card">
            <Card.Body>
              <Card.Title>Rejected Candidates</Card.Title>
              <Card.Text>8</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mb-4 custom-chart-card">
            <Card.Header>Applications Received by Source</Card.Header>
            <Card.Body>
              <Bar data={barData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 custom-chart-card">
            <Card.Header>Open Positions by Department</Card.Header>
            <Card.Body  className="small-pie-chart">
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 custom-chart-card">
            <Card.Header>Recruitment Funnel</Card.Header>
            <Card.Body>
              <Bar data={horizontalBarData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mb-4 custom-table-card">
            <Card.Header>Application Details</Card.Header>
            <Table striped bordered hover responsive className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Software Engineer</td>
                  <td>Interview Scheduled</td>
                  <td>Referral</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>Product Manager</td>
                  <td>Application Received</td>
                  <td>Social Media</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mike Johnson</td>
                  <td>UX Designer</td>
                  <td>Hired</td>
                  <td>Career Site</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecruitmentProcess;
