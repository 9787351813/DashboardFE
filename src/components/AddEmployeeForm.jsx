// src/components/AddEmployee.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/recruitment', { name, position })
            .then(() => {
                // Navigate to the RecruitmentProcess page after successful addition
                navigate('/recruitment'); // Adjust this if RecruitmentProcess is not at '/recruitment'
            })
            .catch(err => {
                setError('There was an error adding the employee!');
                console.error(err);
            });
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Add New Employee</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Employee
                </Button>
            </Form>
        </Container>
    );
};

export default AddEmployee;
