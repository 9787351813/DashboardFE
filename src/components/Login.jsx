import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Import CSS file

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setError('');

    try {
      const response = await axios.post('https://dashboardbe-4.onrender.com/api/auth/login', values);
      if (response.data.token) {
        // Save token in local storage or state
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (err) {
      // Check for error response and update the error message
      if (err.response) {
        setError(err.response.data.error || 'Login failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your network.');
      } else {
        setError('Request setup error. Please try again.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src="https://avatars.design/wp-content/uploads/2016/09/avatar1b.jpg" alt="Login" />
      </div>
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-button" disabled={isSubmitting}>
                Login
              </button>
              <div className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
