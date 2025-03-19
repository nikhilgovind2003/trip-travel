import { useEffect, useState } from "react";
import axios from "axios";

const TotalPlaces = () => {
  const [placeCount, setPlaceCount] = useState(0);

  // Fetch total places listed
  const getPlaces = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/places/get-places");
      if (data?.totalPlaces !== undefined) {
        setPlaceCount(data.totalPlaces);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center transform transition-all duration-300 hover:scale-105">
        <p className="text-6xl font-extrabold text-green-600">{placeCount}</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Total Places Listed</h2>
      </div>
    </div>
  );
};

export default TotalPlaces;
