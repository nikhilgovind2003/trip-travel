import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../../assets/SampleImage.jpg";

const NearestPlacesCard = ({ data, latitude, longitude }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = data?.images
    ? `url(http://localhost:4000/${data.images})`
    : `url(${img})`;

  const handleClick = () => {
    if (!data?.lon || !data?.lat) {
      console.error("Longitude or Latitude is missing.");
      return;
    }
    navigate(`/visit/${data?.lon}/${data?.lat}`);
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return (
    <div
      className="w-full transform transition duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-3xl shadow-lg"
        style={{
          backgroundImage: imageUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

        {/* Like Button */}
        <div
          onClick={() => setLike((prev) => !prev)}
          className="absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
        >
          {like ? <FaHeart size={24} className="text-red-500" /> : <CiHeart size={24} className="text-gray-700" />}
        </div>

        {/* Content */}
        <div className="absolute bottom-4 left-0 right-0 px-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{data.name}</h2>
            <span className="flex items-center text-lg font-semibold text-yellow-400">
              4.6 <FaStar size={18} className="ml-1" />
            </span>
          </div>

          {/* Address with Hover Effect */}
          <p className={`text-gray-200 text-sm transition-all duration-500 ease-in-out ${isHovered ? "opacity-100" : "opacity-80 line-clamp-2"}`}>
            {data.formatted}
          </p>

          {/* Distance */}
          <div className="mt-2 text-gray-300 font-medium">
            📍 {haversineDistance(latitude, longitude, data.lat, data.lon)} km away
          </div>

          {/* Visit Button */}
          <button
            onClick={handleClick}
            className="mt-4 px-6 py-2 rounded-full font-semibold text-lg transition duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105"
          >
            Visit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearestPlacesCard;
