import React, { useEffect, useState } from "react";
import axios from "axios";
import TotalPlaces from "./TotalPlaces";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [mostLikedPlace, setMostLikedPlace] = useState(null);

  // Fetch total users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/auth/get-users");
      if (data?.allUsers !== undefined) {
        setUserCount(data.allUsers);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch most liked place
  const likedPlaces = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/places/most-liked-place");
      if (data.success) {
        setMostLikedPlace(data.place[0]);
        setLikeCount(data.likeCount);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching most liked place:", error);
    }
  };

  useEffect(() => {
    getUsers();
    likedPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-24">
      <div className="grid grid-cols-1 md:grid-cols-1 w-[50%] gap-8">

        {/* User Count Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 h-44 text-center transform transition-all duration-300 hover:scale-105">
          <p className="text-6xl font-extrabold text-blue-600">{userCount}</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Total Users</h2>
        </div>

        {/* Most Liked Place Card */}
        {mostLikedPlace && (
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800">Most Liked Place</h2>
            <img
              src={`http://localhost:4000/${mostLikedPlace?.images}`}
              alt={mostLikedPlace?.placeName}
              className="w-full h-64 object-cover rounded-lg my-4 shadow-md"
            />
            <p className="text-2xl font-semibold text-blue-600">{mostLikedPlace?.placeName}</p>
            <p className="text-lg font-bold text-red-500 mt-2">{likeCount} Likes ❤️</p>
          </div>
        )}

      <TotalPlaces />
        
      </div>
    </div>
  );
};

export default Dashboard;
