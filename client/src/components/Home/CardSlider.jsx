import HomeCards from "./HomeCards";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

const CardSlider = ({ rows, nearestPlace }) => {

  // State variables
  const [destination, setDestination] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);  // Page starts from 1
  const token = localStorage.getItem("token");




  console.log(destination)
  // Constants
  const itemsPerPage = 5;  // Display 5 items per page

  // Fetch data on mount & page change
  useEffect(() => {
    fetchDestinations();
  }, [currentPage]);  // Refetch data when page changes

  // Server-side Pagination Fetch Function
  const fetchDestinations = async () => {
    try {
      const url =  `http://localhost:4000/api/v1/places/get-all-places?page=${currentPage}&limit=${itemsPerPage}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDestination(data.places);
        setTotalPages(data.totalPages);  // Set total pages from the API
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <>
      {/* Grid Display */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4 w-full py-4 px-4">
        {destination.map((item, index) => (
          <div key={index} className="w-full">
            <HomeCards item={item} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default CardSlider;
