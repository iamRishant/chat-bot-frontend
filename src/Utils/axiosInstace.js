// src/services/apiClient.js
import axios from 'axios';
const baseurl=import.meta.env.VITE_BACKEND_API_URL
const apiClient = axios.create({
  baseURL: baseurl, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers, e.g., 'Authorization': `Bearer ${token}`
  },
});

// Add an interceptor to handle authentication and token refresh
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;