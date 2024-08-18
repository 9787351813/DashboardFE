import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getLeaves = () => {
  return api.get('/leaverequest');
};

export const createLeave = (leaveData) => {
  return api.post('/leaverequest', leaveData);
};

export default api;
