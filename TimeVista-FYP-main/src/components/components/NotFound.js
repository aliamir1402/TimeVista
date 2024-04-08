// NotFound.js
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg mt-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
