// src/components/AuthSlider.jsx
import React, { useState } from 'react';
import LoginForm from '../Pages/LoginForm.jsx';
import SignupForm from '../Pages/SignUpForm.jsx';


const AuthSlider = () => {
  // 'isLogin' state determines which form is active
  const [isLogin, setIsLogin] = useState(true);

  // Function to switch to the Login form
  const switchToLogin = () => setIsLogin(true);

  // Function to switch to the Signup form
  const switchToSignup = () => setIsLogin(false);

  // The 'transform-x-[50%]' class shifts the container to the left by 50%
  // This effectively slides the Signup form into view and the Login form out
  const formWrapperClasses = `
    flex w-[200%] transition-transform duration-700 ease-in-out
    ${isLogin ? 'translate-x-0' : '-translate-x-1/2'}
  `;
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl shadow-2xl bg-white">
        
        {/* The sliding content container */}
        <div className={formWrapperClasses}>
          
          {/* Login Form Container - takes 50% of the 200% width */}
          <div className="w-1/2 flex-shrink-0">
            <LoginForm onSwitchToSignup={switchToSignup} />
          </div>
          
          {/* Signup Form Container - takes 50% of the 200% width */}
          <div className="w-1/2 flex-shrink-0">
            <SignupForm onSwitchToLogin={switchToLogin} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthSlider;