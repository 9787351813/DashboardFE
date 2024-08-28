import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './PerformanceEvaluation.css'; // Import the CSS file

const PerformanceTable = () => {
    const [performances, setPerformances] = useState([]);
    const [selectedPerformance, setSelectedPerformance] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/performance');
                setPerformances(response.data);
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEditClick = (performance) => {
        setSelectedPerformance(performance);
        setFormData(performance);
        setIsNew(false);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setFormData({
            employeeName: '',
            goals: '',
            feedback: '',
            rating: '',
            date: new Date().toISOString().substring(0, 10),
        });
        setIsNew(true);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (isNew) {
            try {
                const response = await axios.post('http://localhost:3000/api/performance', formData);
                setPerformances([...performances, response.data]);
                alert('Added successfully');
            } catch (error) {
                console.error('Error adding performance record:', error);
            }
        } else {
            await handleUpdate(); // Handle update if not new
        }
        setShowModal(false);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/performance/${selectedPerformance._id}`, formData);
            setPerformances(performances.map(p => p._id === selectedPerformance._id ? response.data : p));
            alert('Updated successfully');
        } catch (error) {
            console.error('Error updating performance record:', error);
        }
    };

    const handleDelete = async (id) => {
      try {
          await axios.delete(`http://localhost:3000/api/performance/${id}`);
          setPerformances(performances.filter(p => p._id !== id));
          alert('Deleted successfully');
      } catch (error) {
          console.error('Error deleting performance record:', error);
          alert('Error deleting performance record');
      }
  };
  

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Performance Table</h2>
                <Button variant="success" onClick={handleAddClick}>
                    <i className="bi bi-plus-lg"></i> Add Performance
                </Button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Goals</th>
                        <th>Feedback</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Manage</th> {/* Column for Manage and Delete */}
                    </tr>
                </thead>
                <tbody>
                    {performances.map(performance => (
                        <tr key={performance._id}>
                            <td>
                                
                                {performance.employeeName}
                            </td>
                            <td>{performance.goals}</td>
                            <td>{performance.feedback}</td>
                            <td>{performance.rating}</td>
                            <td>{new Date(performance.date).toLocaleDateString()}</td>
                            <td>
                                <Button variant="purple" onClick={() => handleEditClick(performance)}>
                                    <i className="bi bi-pencil-square"></i> Manage
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(performance._id)}>
                    <i className="bi bi-trash"></i> Delete
                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>{isNew ? "Add Performance" : "Edit Performance"}</Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Employee Name"
                        value={formData.employeeName}
                        onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                        readOnly={!isNew}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Goals"
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Feedback"
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Rating"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                    <input
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>{isNew ? "Add" : "Save"}</Button>
                </Modal.Footer>
            </Modal>

            <div className="dashboard-cards">
                <div className="card">
                    <h4><i className="bi bi-people-fill"></i> Employees</h4>
                    <span>{performances.length}</span>
                </div>
                <div className="card">
                    <h4><i className="bi bi-flag-fill"></i> Goals</h4>
                    <span>{performances.length}</span>
                </div>
                <div className="card">
                    <h4><i className="bi bi-chat-left-text-fill"></i> Feedback</h4>
                    <span>{performances.length}</span>
                </div>
                <div className="card">
                    <h4><i className="bi bi-star-fill"></i> Average Rating</h4>
                    <span>
                        {
                            performances.length > 0
                            ? (() => {
                                const validRatings = performances
                                    .map(p => parseFloat(p.rating))
                                    .filter(rating => !isNaN(rating));

                                const ratingSum = validRatings.reduce((acc, r) => acc + r, 0);
                                const ratingCount = validRatings.length;

                                return ratingCount > 0 
                                    ? (ratingSum / ratingCount).toFixed(2)
                                    : 0;
                            })()
                            : 0
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceTable;
