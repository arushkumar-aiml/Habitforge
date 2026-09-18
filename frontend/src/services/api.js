import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  verify: () => api.get('/auth/verify'),
};

// Habits API
export const habitsAPI = {
  create: (habitData) => api.post('/habits', habitData),
  getAll: () => api.get('/habits'),
  getById: (habitId) => api.get(`/habits/${habitId}`),
  update: (habitId, habitData) => api.put(`/habits/${habitId}`, habitData),
  complete: (habitId) => api.post(`/habits/${habitId}/complete`),
  delete: (habitId) => api.delete(`/habits/${habitId}`),
};

// Predictions API
export const predictionsAPI = {
  predictSuccess: (habitData) =>
    api.post('/predictions/success', habitData),
  getOptimalReminderTime: (habitData) =>
    api.post('/predictions/reminder-time', habitData),
  getRecommendations: (habitsData) =>
    api.post('/predictions/recommendations', habitsData),
  analyzePattern: (patternData) =>
    api.post('/predictions/pattern', patternData),
};

// Analytics API
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getProgress: (habitId, days = 30) =>
    api.get('/analytics/progress', { params: { habitId, days } }),
  getCategoryStats: () => api.get('/analytics/category'),
  getWeeklySummary: () => api.get('/analytics/weekly'),
};

export default api;
