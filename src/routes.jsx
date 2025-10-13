// src/routes.js
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './Components/NotFound';
import AuthSlider from './Components/AuthSlider';
import ChatBot from './Pages/ChatBot';

// Lazy-loaded components
// const Home = lazy(() => import('./pages/Home'));


// A component for handling authentication protection
const ProtectedRoute = ({ children }) => {
  const allowed=localStorage.getItem('token');
  const isAuthenticated = allowed?true:false;
  return isAuthenticated ? children : <Navigate to={"/"} replace/>;
};
const NotProtectedRoute = ({ children }) => {
  // a user who is logged in cannot visit login or signup page
  const allowed=localStorage.getItem('token');
  const isAuthenticated = allowed?true:false;
  return !isAuthenticated?children:<Navigate to={"/chat"} replace/>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<NotProtectedRoute><AuthSlider /></NotProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatBot/></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;