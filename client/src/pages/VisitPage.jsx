import { useParams } from "react-router-dom";
import PlaceCarousel from "../components/PlaceCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Hotels from "../components/VisitPage/Hotels";
import NearestPlace from "./../components/VisitPage/NearestPlace";
import Footer from "./../components/Footer";
import Weather from "../components/VisitPage/Weather";
import MapComponent from "../components/VisitPage/MapComponent";
import Review from "../components/VisitPage/Review";
import Navbar from "./../components/Navbar";



const VisitPage = () => {
  const { id } = useParams();

  console.log("id => ", id);

  const token = localStorage.getItem("token");
  const [location, setLocation] = useState({});
  const longitude = location.location?.coordinates[0];
  const latitude = location.location?.coordinates[1];

  const fetchDestination = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/places/get-place-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setLocation(data.place);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className=" lg:px-24 pt-12 px-4 md:px-6 bg-blue-50 lg:pt-24">
        <div className=" w-full lg:w-[700px] my-12">
          <h1 className=" lg:text-4xl text-xl font-semibold">
            {location.placeName}
          </h1>
          <p className=" text-gray-500 mt-4 text-sm lg:text-lg">
            {location.description}
          </p>
        </div>
        <PlaceCarousel img={location.images} />


        <Weather placeName={location.placeName} />
        <NearestPlace latitude={latitude} longitude={longitude} />
        {location?.city || location?.placeName ? (
          <Hotels latitude={latitude} longitude={longitude} />
        ) : (
          <p>Data not found</p>
        )}

        <MapComponent longitude={longitude} latitude={latitude} />
        <Review placeId={id} />

        <Footer />
      </div>
    </>
  );
};

export default VisitPage;
