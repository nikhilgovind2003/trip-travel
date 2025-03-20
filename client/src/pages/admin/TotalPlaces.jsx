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
    <div>
      
    </div>
  );
};

export default TotalPlaces;
