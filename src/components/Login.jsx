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
      const response = await axios.post('https://dashboardbe-3.onrender.com/api/auth/login', values);
      if (response.data.token) {
        console.log('Login successful');
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Email and password do not match');
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
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <Field type="password" name="password" />
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
