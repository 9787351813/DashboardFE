import axios from 'axios';

const API_URL = 'https://dashboardbe-4.onrender.com/api';

export const getAllEmployees = () => axios.get(`${API_URL}/employees`);
export const getAttendanceTrends = () => axios.get(`${API_URL}/attendance/present`);
export const getPerformanceRatings = () => axios.get(`${API_URL}/performance/ratings`);
export const getRecruitmentStats = () => axios.get(`${API_URL}/recruitment/stats`);
export const fetchData = () => {
    return axios.get(`${API_URL}/dashboard`);
};
