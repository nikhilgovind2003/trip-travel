import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = ({ img }) => {
  const slider = [img, img, img, img, img]; // Example images

  return (
  <div className="flex justify-center mx-auto items-center mb-12">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        spaceBetween={140}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation={{
          prevEl: ".swiper-left-arrow",
          nextEl: ".swiper-right-arrow",
          clickable: true,
        }}
        pagination={{ el: "", clickable: true }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="w-full mx-auto  lg:relative"
      >
        {slider.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center pt-12 lg:w-[500px] lg:h-[400px] w-[200px] -[400px]"
            style={{
              width: "500px",
            }}
          >
            <div className=" relative h-[350px]">
              <img
                src={`http://localhost:4000/${slide}`}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-[25px] shadow-lg"
              />
              <div className=" absolute top-0 left-0 w-full h-full bg-black/50 rounded-[25px] z-50"></div>
            </div> 
          </SwiperSlide>
        ))}

        <div className=" absolute top-0 right-0 w-[500px] h-full md:bg-gradient-to-r from-transparent to-gray-200 z-10"></div>
        <div className=" absolute top-0 left-0 w-[500px] h-full md:bg-gradient-to-r from-gray-200 to-transparent z-10"></div>

        <div className="swiper-container absolute top-1/2 trannsform -translate-y-1/2 left-0 z-30 flex justify-between w-full">
          <button className="swiper-left-arrow text-white">
            <FaChevronLeft size={40} />
          </button>
          <button className="swiper-right-arrow text-white">
            <FaChevronRight size={40} />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
