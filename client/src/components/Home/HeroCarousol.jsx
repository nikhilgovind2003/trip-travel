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
  const images = [img3, img1, img4];

  // useeffectts
  useEffect(() => {
    setFadeIn(true);
  }, []);



  // others
  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };


  return (
    <div className={`h-[75vh] w-full ${fadeIn ? "navabar-animation" : ""}`}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className=" w-full" key={index}>
            <div className="w-screen h-screen absolute bg-[#55525529]"></div>
            <img
              src={image}
              className="w-full h-[75vh] object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousol;
