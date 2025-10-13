// src/components/SignupForm.jsx
import React, { useState } from 'react';
import apiClient from '../Utils/axiosInstace';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSwitchToLogin }) => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
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
      const signupPayload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password
      };

      console.log('Signup attempt with payload:', signupPayload);

      // Validate form data
      const validationError = validateForm(signupPayload);
      if (validationError) {
        throw new Error(validationError);
      }

      // Simulate API call - replace with actual API call
      const response = await apiClient.post('signup',signupPayload);
      if(!response) throw new Error;
      console.log('Signup successful:', response);
      localStorage.setItem('token', response?.data?.token);
      navigate('/chat');
    //   window.location.href('/chat')
      
      // Handle successful signup (redirect, store token, etc.)
    //   localStorage.setItem('token', response?.data?.token);
      // redirectToDashboard();
      
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Form validation helper
  const validateForm = (payload) => {
    if (!payload.name || !payload.email || !payload.password) {
      return 'All fields are required';
    }

    if (payload.name.length < 2) {
      return 'Full name must be at least 2 characters';
    }

    if (!isValidEmail(payload.email)) {
      return 'Please enter a valid email address';
    }

    if (payload.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return null;
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Mock API function - replace with actual API call

  return (
    <div className="p-8 w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
            disabled={isLoading}
            minLength={2}
          />
        </div>
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
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
            disabled={isLoading}
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters long
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition duration-300 font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          disabled={isLoading}
          className="text-sm text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed transition duration-300 cursor-pointer"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default SignupForm;