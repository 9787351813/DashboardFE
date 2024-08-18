import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Table, Modal } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faAddressBook,
  faTimesCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./LeaveRequest.css"; // Import the CSS file

const LeaveRequest = () => {
  const [leaveData, setLeaveData] = useState([
    { id: 1, type: "Annual Leave", start: "2024-08-01", end: "2024-08-05", status: "Approved" },
    { id: 2, type: "Sick Leave", start: "2024-08-10", end: "2024-08-12", status: "Pending" },
    { id: 3, type: "Unpaid Leave", start: "2024-08-15", end: "2024-08-20", status: "Declined" },
    { id: 4, type: "Annual Leave", start: "2024-09-01", end: "2024-09-05", status: "Approved" },
    { id: 5, type: "Sick Leave", start: "2024-09-10", end: "2024-09-12", status: "Pending" },
    { id: 6, type: "Unpaid Leave", start: "2024-09-15", end: "2024-09-20", status: "Approved" },
  ]);

  const [leaveCounts, setLeaveCounts] = useState({
    approved: 0,
    pending: 0,
    declined: 0,
    requests: 0,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: "Annual Leave",
    start: "",
    end: "",
    status: "Pending",
  });

  const [currentLeave, setCurrentLeave] = useState(null);

  useEffect(() => {
    const counts = {
      approved: leaveData.filter(leave => leave.status === "Approved").length,
      pending: leaveData.filter(leave => leave.status === "Pending").length,
      declined: leaveData.filter(leave => leave.status === "Declined").length,
      requests: leaveData.length,
    };

    setLeaveCounts(counts);
  }, [leaveData]);

  const leaveAllowance = 30; // Example data
  const remainingAllowance = 20; // Example data
  const leaveUsed = leaveAllowance - remainingAllowance; // Example data

  const remainingPercentage = (remainingAllowance / leaveAllowance) * 100;
  const usedPercentage = (leaveUsed / leaveAllowance) * 100;

  const leaveTypeOptions = ["All", "Unpaid Leave", "Annual Leave"];

  const handleAddLeave = () => {
    setCurrentLeave(null);
    setNewLeave({
      type: "Annual Leave",
      start: "",
      end: "",
      status: "Pending",
    });
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentLeave) {
      // Update existing leave request
      setLeaveData(prevData =>
        prevData.map(leave =>
          leave.id === currentLeave.id
            ? { ...currentLeave, ...newLeave }
            : leave
        )
      );
    } else {
      // Add new leave request
      setLeaveData(prevData => [
        ...prevData,
        { id: Date.now(), ...newLeave },
      ]);
    }
    handleCloseAddModal();
  };

  const handleEdit = (leave) => {
    setCurrentLeave(leave);
    setNewLeave({ ...leave });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setLeaveData(prevData => prevData.filter(leave => leave.id !== id));
  };

  return (
    <Container className="main-container">
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Leave Requests</h3>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button variant="primary" className="me-2" onClick={handleAddLeave}>
            Add Leave
          </Button>
        </Col>
      </Row>

      <Card className="mb-4 man">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card className="info-card mb-4">
                <Card.Body>
                  <h4>Leave Allowance</h4>
                  <h2>{leaveAllowance} hrs</h2>
                  <Form.Group controlId="leaveType" className="mt-3">
                    <Form.Label>Leave Type</Form.Label>
                    <Form.Control
                      as="select"
                      style={{
                        width: "200px",
                        display: "inline-block",
                      }}
                    >
                      {leaveTypeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Progress Cards */}
              <Row className="text-center mb-4 progress-cards-row">
                <Col xs={6}>
                  <Card className="mb-3 progress-card">
                    <Card.Body>
                      <h5>Remaining Allowance</h5>
                      <div className="circular-progress-container">
                        <CircularProgressbar
                          value={remainingPercentage}
                          text={`${remainingPercentage.toFixed(1)}%`}
                          styles={buildStyles({
                            pathColor: "#36A2EB",
                            textColor: "#000",
                          })}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className="mb-3 progress-card">
                    <Card.Body>
                      <h5>Leave Used</h5>
                      <div className="circular-progress-container">
                        <CircularProgressbar
                          value={usedPercentage}
                          text={`${usedPercentage.toFixed(1)}%`}
                          styles={buildStyles({
                            pathColor: "#FF6384",
                            textColor: "#000",
                          })}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* Right Side: Two Rows of Small Cards */}
            <Col md={4}>
              {/* First Row of Small Cards */}
              <Row className="text-center mb-4 small-cards-row">
                <Col xs={6}>
                  <Card className="small-card">
                    <Card.Body>
                      <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
                      <h5 className="mt-2">Approved</h5>
                      <h4>{leaveCounts.approved}</h4>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className="small-card">
                    <Card.Body>
                      <FontAwesomeIcon icon={faClock} size="3x" color="orange" />
                      <h5 className="mt-2">Pending</h5>
                      <h4>{leaveCounts.pending}</h4>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Second Row of Small Cards */}
              <Row className="text-center small-cards-row">
                <Col xs={6}>
                  <Card className="small-card">
                    <Card.Body>
                      <FontAwesomeIcon icon={faTimesCircle} size="3x" color="red" />
                      <h5 className="mt-2">Declined</h5>
                      <h4>{leaveCounts.declined}</h4>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className="small-card">
                    <Card.Body>
                      <FontAwesomeIcon icon={faAddressBook} size="3x" color="blue" />
                      <h5 className="mt-2">Requests</h5>
                      <h4>{leaveCounts.requests}</h4>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((leave, index) => (
            <tr key={index}>
              <td>{leave.type}</td>
              <td>{leave.start}</td>
              <td>{leave.end}</td>
              <td>
                <span
                  className={`badge ${
                    leave.status === "Approved"
                      ? "bg-success"
                      : leave.status === "Pending"
                      ? "bg-warning"
                      : "bg-danger"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => handleEdit(leave)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(leave.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showAddModal || showEditModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentLeave ? "Edit Leave" : "Add Leave"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={newLeave.type}
                onChange={handleInputChange}
              >
                {leaveTypeOptions.slice(1).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="start" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start"
                value={newLeave.start}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="end" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end"
                value={newLeave.end}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newLeave.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentLeave ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LeaveRequest;
