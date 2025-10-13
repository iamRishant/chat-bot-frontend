// src/components/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
          404 Error
        </p>
        <h1 className="mt-4 text-5xl font-extrabold text-gray-900 sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <a
            href="/" // Link to your application's home or default route
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;