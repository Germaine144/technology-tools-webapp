// In: @/lib/axios.ts (The new, corrected version)

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://e-tech-store-6d7o.onrender.com/api', 
  withCredentials: true, 
});

// Optional: Request interceptor to add auth tokens if you use them
api.interceptors.request.use(config => {
  // Logic to get and add token if you're using token-based auth
  // const token = localStorage.getItem('authToken');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// The corrected response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
   
    if (error.response && error.response.status === 401) {
      console.error("Authentication Error: The user's session may have expired.");
    }
    
    return Promise.reject(error);
  }
);

export default api;