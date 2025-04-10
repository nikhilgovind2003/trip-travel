import axios from "axios";
import { useEffect, useState } from "react";
import NearestPlacesCard from "./NearestPlacesCard";
import Pagination from "../Pagination";
import { SlidersHorizontal } from "lucide-react";

const NearestPlace = ({ longitude, latitude }) => {
  const token = localStorage.getItem("token");
  
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  
  const [tourism, setTourism] = useState("");
  const [distance, setDistance] = useState(5000);

  const itemsPerPage = 5;  // Consistent with backend pagination

  // Fetch places with pagination and filters
  const fetchNearestPlace = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/places/get-nearest-places?page=${currentPage}&limit=${itemsPerPage}`,
        {
          longitude,
          latitude,
          tourism: tourism || undefined,
          distance: distance || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNearestPlaces(data.place);       // Update places with server-side pagination
      setTotalPages(data.totalPages);     // Set total pages from the server

      // Set filter options
      setFilterOptions([
        ...new Set(data.place.map((p) => p.properties.datasource.raw.tourism)),
      ]);
      
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearestPlace();
  }, [longitude, latitude, tourism, distance, currentPage]);   // Include currentPage dependency

  // Handlers
  const handleTourismChange = (e) => {
    setTourism(e.target.value);
    setCurrentPage(1);    // Reset to first page on filter change
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    setCurrentPage(1);    // Reset to first page on filter change
  };

  return (
    <div className="mt-6 bg-white py-6 px-4 rounded-3xl shadow-xl transition-all duration-300 ease-in-out">
      
      {/* Header */}
      <div className="flex justify-between items-center mx-auto px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-800">Nearest Places</h1>
        <SlidersHorizontal
          className="cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300"
          size={28}
          onClick={() => setShowFilter((prev) => !prev)}
        />
      </div>

      {/* Filters */}
      {showFilter && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md transition-all duration-500 ease-in-out">
          <div className="flex gap-4">
            <select
              onChange={handleDistanceChange}
              className="w-full rounded-lg px-4 py-2 border-2 border-gray-300 text-gray-700 focus:outline-none focus:border-blue-400 transition"
              value={distance}
            >
              <option disabled>Distance</option>
              <option value="5000">5km</option>
              <option value="10000">10km</option>
              <option value="20000">20km</option>
            </select>
            <select
              onChange={handleTourismChange}
              className="w-full rounded-lg px-4 py-2 border-2 border-gray-300 text-gray-700 focus:outline-none focus:border-blue-400 transition"
              value={tourism}
            >
              <option value="">All Places</option>
              {filterOptions.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          {/* Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full py-6 px-4">
            {nearestPlaces?.map((place, index) => (
              <div key={index} className="px-2">
                <NearestPlacesCard
                  key={index}
                  data={place.properties}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NearestPlace;
