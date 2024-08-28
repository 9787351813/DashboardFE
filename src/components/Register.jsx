import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css'; // Import CSS file

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const requestData = { ...values };
    console.log('Submitting registration data:', requestData);

    try {
      const response = await axios.post('https://dashboardbe-3.onrender.com/api/auth/register', requestData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        console.error('Error response:', error.response.data); // Log response data
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response from server. Please check your network.');
      } else {
        console.error('Error message:', error.message);
        setError('Request setup error. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="image-container">
          <img src="https://avatars.design/wp-content/uploads/2016/09/avatar1b.jpg" alt="Register" />
        </div>
        <h1 className="register-title">Register</h1>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field type="text" id="firstName" name="firstName" autoComplete="given-name" />
                <ErrorMessage name="firstName" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field type="text" id="lastName" name="lastName" autoComplete="family-name" />
                <ErrorMessage name="lastName" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" autoComplete="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" autoComplete="new-password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <button type="submit" className="register-button" disabled={isSubmitting}>
                Register
              </button>
            </Form>
          )}
        </Formik>
        {error && <p className="error-message">{error}</p>}
        <div className="login-link-container">
          <Link to="/login" className="login-link">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
