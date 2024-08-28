import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeaveRequest.css'; // Custom CSS

const LeaveRequestPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({ type: '', start: '', end: '', status: 'Pending' });
  const [leaveType, setLeaveType] = useState('All');
  const [circularData, setCircularData] = useState({ pending: 0, approved: 0, declined: 0 });

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    filterLeaves();
  }, [leaveType, leaves]);

  const fetchLeaves = async () => {
    const token = localStorage.getItem('token');
    console.log('Token from local storage:', localStorage.getItem('token'));
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3000/api/leaves', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        const leavesData = Array.isArray(response.data) ? response.data : [];
        setLeaves(leavesData);
        updateCircularProgress(leavesData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error.response ? error.response.data : error.message);
    }
  };
  

  const filterLeaves = () => {
    if (leaveType === 'All') {
      setFilteredLeaves(leaves);
    } else {
      const filtered = leaves.filter(leave => leave.type === leaveType);
      setFilteredLeaves(filtered);
    }
  };

  const updateCircularProgress = (leaves) => {
    const pending = leaves.filter(leave => leave.status === 'Pending').length;
    const approved = leaves.filter(leave => leave.status === 'Approved').length;
    const declined = leaves.filter(leave => leave.status === 'Declined').length;

    setCircularData({ pending, approved, declined });
  };

  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3000/api/leaves', newLeave, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        const updatedLeaves = [...leaves, response.data];
        setLeaves(updatedLeaves);
        setNewLeave({ type: '', start: '', end: '', status: 'Pending' });
        updateCircularProgress(updatedLeaves);
      } else {
        console.error('Error: Leave not added successfully');
      }
    } catch (error) {
      console.error('Error adding leave:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/api/leaves/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedLeaves = leaves.filter((leave) => leave._id !== id);
      setLeaves(updatedLeaves);
      updateCircularProgress(updatedLeaves);
    } catch (error) {
      console.error('Error deleting leave:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Leave Requests</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-row">
          <div className="form-group col-md-3">
            <input
              type="text"
              name="type"
              className="form-control"
              placeholder="Leave Type"
              value={newLeave.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <input
              type="date"
              name="start"
              className="form-control"
              value={newLeave.start}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <input
              type="date"
              name="end"
              className="form-control"
              value={newLeave.end}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <select name="status" className="form-control" value={newLeave.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Leave</button>
      </form>

      <div className="form-group mt-3">
        <label htmlFor="leaveType">Select Leave Type</label>
        <select id="leaveType" className="form-control" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="All">All</option>
          <option value="Unpaid Leave">Unpaid Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>
      </div>

      <div className="table-responsive info-card mt-3">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.type}</td>
                <td>{new Date(leave.start).toLocaleDateString()}</td>
                <td>{new Date(leave.end).toLocaleDateString()}</td>
                <td>
                  {leave.status === 'Pending' && <FaClock className="text-warning" />}
                  {leave.status === 'Approved' && <FaCheck className="text-success" />}
                  {leave.status === 'Declined' && <FaTimes className="text-danger" />}
                  {' '}{leave.status}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(leave._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="circular-progress mt-4">
        <CircularProgress label="Pending" value={circularData.pending} />
        <CircularProgress label="Approved" value={circularData.approved} />
        <CircularProgress label="Declined" value={circularData.declined} />
      </div>
    </div>
  );
};

const CircularProgress = ({ label, value }) => (
  <div className="progress-card">
    <h5>{label}</h5>
    <div className="circular-progress-bar">
      {value}
    </div>
  </div>
);

export default LeaveRequestPage;
