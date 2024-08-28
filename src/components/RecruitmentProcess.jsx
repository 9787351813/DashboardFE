// src/components/EmployeeManagement.jsx
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApplicationTable from './ApplicationTable';
import SelectedList from './SelectedList';



const RecruitmentProcess = () => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const navigate = useNavigate();

    const handleSelect = (employee) => {
        setSelectedEmployees(prevSelected => [...prevSelected, employee]);
    };

    const handleDelete = (id) => {
      setSelectedEmployees(prevSelected => prevSelected.filter(emp => emp._id !== id));
    };

    return (
        <Container className="mt-4">
            <h1>Recruitment Process</h1>
            <Button variant="primary" onClick={() => navigate('/add-employee')}>Add</Button>
            <ApplicationTable onSelect={handleSelect} onDelete={handleDelete} />
            <SelectedList selectedEmployees={selectedEmployees} />
        </Container>
    );
};

export default  RecruitmentProcess;
