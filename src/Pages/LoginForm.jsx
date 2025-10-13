// src/components/LoginForm.jsx
import React, { useState } from 'react';
import apiClient from '../Utils/axiosInstace';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // API payload structure
      const loginPayload = {
        email: formData.email.trim(),
        password: formData.password
      };

      console.log('Login attempt with payload:', loginPayload);

      // Simulate API call - replace with actual API call
      const response = await apiClient.post('login',loginPayload);
      if(!response) throw new Error;
      console.log('Login successful:', response);
      localStorage.setItem('token', response?.data?.token);
      navigate('/chat');
      
      // Handle successful login (redirect, store token, etc.)
      // redirectToDashboard();
      
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API function - replace with actual API call


  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="p-8 w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-300 font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToSignup}
          disabled={isLoading}
          className="text-sm text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-300 cursor-pointer"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;