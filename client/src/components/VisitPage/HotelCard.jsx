import { useRef, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/hotel.jpg";
import img2 from "../../assets/SampleImage.jpg";
import img3 from "../../assets/Carousol-3.png";
import img4 from "../../assets/Carousol-4.png";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="relative bg-white shadow-xl rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105">
      {/* Swiper Container */}
      <div className="relative w-full h-[400px]">
        <Swiper
          ref={swiperRef}
          loop={true}
          cssMode={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-bullet"></span>`,
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination]}
          className="mySwiper h-full"
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-full">
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`hotel-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition">
          <CiHeart size={25} className="text-gray-600" />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            ref={prevRef}
            className="p-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg transition hover:scale-110"
          >
            <FaAngleLeft size={20} className="text-gray-700" />
          </button>
          <button
            ref={nextRef}
            className="p-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg transition hover:scale-110"
          >
            <FaAngleRight size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Book Now Button */}
        <button
          onClick={() => navigate(`/book-now/${hotel?.properties?.place_id}`)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 text-white font-semibold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg hover:scale-105 transition"
        >
          Book Now
        </button>
      </div>

      {/* Hotel Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {hotel?.properties?.address_line1 || "Luxury Hotel"}
          </h1>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar size={18} />
            <span className="text-gray-800 font-semibold">
              {hotel?.properties?.datasource?.raw?.stars || 4.5}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {hotel?.properties?.formatted || "A wonderful place to stay!"}
        </p>
        {hotel?.properties?.datasource?.raw?.phone && (
          <p className="text-gray-700 font-medium">
            📞 {hotel?.properties?.datasource?.raw?.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
