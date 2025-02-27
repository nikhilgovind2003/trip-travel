import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-green-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Not Found"
        className="w-96 mt-4"
      />
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
