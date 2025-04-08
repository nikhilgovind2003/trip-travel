import img1 from "../../assets/Carousol-1.png";
import img3 from "../../assets/Carousol-3.png";
import img4 from "../../assets/Carousol-4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const HeroCarousol = () => {
  // usestates
  const [fadeIn, setFadeIn] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const images = [img3, img1, img4];

  // Scroll event listener for parallax
  useEffect(() => {
    setFadeIn(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // settings
  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className={"h-[50vh] mt-20 w-full"}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="bg-fixed w-full relative overflow-hidden" key={index}>
            <div className="w-screen h-screen absolute bg-[#55525529]"></div>
            
            {/* Parallax effect applied here */}
            <img
              src={image}
              className="w-full h-[50vh] object-cover transition-transform duration-500 ease-out"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousol;
