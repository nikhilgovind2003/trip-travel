import HomeCards from "./HomeCards";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Pagination from "../Pagination";

const CardSlider = ({ rows, nearestPlace }) => {

  // usestate
  const [destination, setDestination] = useState([]);
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(0);
  // useeffects
  useEffect(() => {
    fetchDestinations();
  }, []);


  // Functions
  const fetchDestinations = async () => {
    try {
      let limit = 5;
      const url = nearestPlace
        ? "http://localhost:4000/api/v1/places/get"
        : `http://localhost:4000/api/v1/places/get-all-places?page=${10}&limit=${limit}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDestination(data.places);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Others
  const itemsPerRow = 5;
  const cardDisplayPerPage = 6;
  const start = currentPage * itemsPerRow;
  const end = start + cardDisplayPerPage;
  const totalPages = Math.ceil(destination.length / cardDisplayPerPage);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 w-full py-4 px-4">
        {destination.slice(start, end).map((item, index) => (
          <div key={index} className="w-full">
            <HomeCards item={item} />
          </div>
        ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default CardSlider;
