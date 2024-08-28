import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        if (newTodo) {
            try {
                await axios.post('http://localhost:3000/api/todos', { title: newTodo });
                setNewTodo('');
                fetchTodos();
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            await axios.put(`http://localhost:3000/api/todos/${id}`, { completed: !completed });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="todo-list">
            <h3>TODO List</h3>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo._id, todo.completed)}
                        />
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
