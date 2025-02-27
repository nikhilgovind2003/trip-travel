import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import HotelCard from "./HotelCard";

const Hotels = ({longitude, latitude}) => {

  const token = localStorage.getItem("token");
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetchHotels();
  }, [longitude, latitude]);







  const fetchHotels = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/hotels/get-hotels",
        { longitude, latitude },
        {
          headers: {
            'Authorization':  `Bearer ${token}`
          }
        },
      );

      if (data.success) {
        setHotels(data.features);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4 bg-white rounded-xl p-4 shadow-lg">
      <h1 className="text-3xl my-4 font-semibold ml-2">Hotels</h1>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          // loop={true}
          pagination={false}
          modules={[Pagination]}
          breakpoints={{
            // When window width is >= 320px (small mobile)
            320: {
              slidesPerView: 2,
            },
            // When window width is >= 768px (tablets)
            768: {
              slidesPerView: 3,
            },
            // When window width is >= 1024px (small laptops/desktops)
            1024: {
              slidesPerView: 4,
            },
           
          }}
        >
          {hotels.map((hotel, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <HotelCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hotels;
