// src/components/SelectedList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Container, ListGroup } from 'react-bootstrap';

const SelectedList = ({ selectedEmployees = [] }) => {
    return (
        <Container className="mt-4">
            <h2>Selected Employees</h2>
            <ListGroup>
                {selectedEmployees.map(employee => (
                    <ListGroup.Item key={employee._id} className="employee-list-item">
                        {employee.name} - {employee.position}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

SelectedList.propTypes = {
    selectedEmployees: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.string.isRequired
        })
    )
};

export default SelectedList;
