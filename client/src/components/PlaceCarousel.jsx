import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = ({ img }) => {
  const slider = [img, img, img, img, img]; // Example images

  return (
    <div className="w-full flex justify-center items-center bg-gray-100 my-10">
      
      <div className="relative w-full">
        
        {/* Swiper Component */}
        <Swiper
          effect={"slide"}               // Slide effect
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}              // One slide at a time
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".swiper-left-arrow",
            nextEl: ".swiper-right-arrow",
            clickable: true,
          }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {slider.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center w-full"
            >
              <div className="relative group w-full h-[400px] md:h-[550px] lg:h-[500px]">
                {/* Image with Full Width */}
                <img
                  src={`http://localhost:4000/${slide}`}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-3xl shadow-lg transition-transform duration-500 group-hover:scale-102"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-70"></div>

                {/* Content */}
                <div className="absolute bottom-8 left-8 text-white z-10 transition-opacity duration-300 group-hover:opacity-100">
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <button className="swiper-left-arrow bg-white text-gray-800 hover:bg-gray-800 hover:text-white rounded-full p-4 transition-transform duration-300 hover:scale-110 shadow-md">
            <FaChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <button className="swiper-right-arrow bg-white text-gray-800 hover:bg-gray-800 hover:text-white rounded-full p-4 transition-transform duration-300 hover:scale-110 shadow-md">
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
