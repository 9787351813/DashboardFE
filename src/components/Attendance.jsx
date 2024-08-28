import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Attendance = () => {
  const [date, setDate] = useState('');
  const [staff, setStaff] = useState('');
  const [status, setStatus] = useState('Present');
  const [attendanceList, setAttendanceList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('https://dashboardbe-4.onrender.com/api/attendance');
      if (Array.isArray(response.data)) {
        setAttendanceList(response.data);
      } else {
        setAttendanceList([]);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(`https://dashboardbe-4.onrender.com/api/attendance/${editId}`, { date, staff, status });
        setAttendanceList(attendanceList.map(item => item._id === editId ? response.data : item));
        setIsEditing(false);
        setEditId(null);
      } else {
        const response = await axios.post('https://dashboardbe-4.onrender.com/api/attendance/add', { date, staff, status });
        setAttendanceList([...attendanceList, response.data]);
      }
      setDate('');
      setStaff('');
      setStatus('Present');
    } catch (error) {
      console.error('Error adding/updating attendance:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (attendance) => {
    setIsEditing(true);
    setEditId(attendance._id);
    setDate(new Date(attendance.date).toISOString().substr(0, 10));
    setStaff(attendance.staff);
    setStatus(attendance.status);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dashboardbe-4.onrender.com/api/attendance/${id}`);
      setAttendanceList(attendanceList.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting attendance:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Attendance List</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Staff:</label>
          <input
            type="text"
            className="form-control"
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Staff</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((attendance) => (
            <tr key={attendance._id}>
              <td>{new Date(attendance.date).toLocaleDateString()}</td>
              <td>{attendance.staff}</td>
              <td>
                {attendance.status === 'Present' && (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" /> Present
                  </>
                )}
                {attendance.status === 'Absent' && (
                  <>
                    <FontAwesomeIcon icon={faTimesCircle} className="text-danger" /> Absent
                  </>
                )}
                {attendance.status === 'Late' && (
                  <>
                    <FontAwesomeIcon icon={faClock} className="text-warning" /> Late
                  </>
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(attendance)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(attendance._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
