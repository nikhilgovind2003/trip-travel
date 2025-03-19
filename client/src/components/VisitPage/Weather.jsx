import React, { useEffect, useState } from "react";
import axios from "axios";
import night from "../../assets/Rectangle 59.png";
import cloud from "../../assets/Partly cloudy.png";
import { Sun, CloudSun, Moon, Droplet } from "lucide-react";
import sunny from "../../assets/cloudy day.png";
import rain from "../../assets/rain.png";

const Weather = ({ placeName }) => {
  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState([]);
  const [time, setTime] = useState("");
  const [weatherImage, setWeatherImage] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const dt = new Date();
      setTime(dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = new Date().getDay();

  const token = localStorage.getItem("token");
  const getIcon = (hour) => {
    const currentHour = new Date(hour?.dt_txt).getHours();
    const isNight = currentHour > 18 || currentHour < 6;

    if (isNight) return <Moon className="text-gray-400 w-8 h-8" />;

    switch (hour?.weather[0]?.main) {
      case "Clear":
        return <Sun className="text-warning w-8 h-8" />;
      case "Clouds":
        return <CloudSun className="text-warning w-8 h-8" />;
      default:
        return <Sun className="text-warning w-8 h-8" />;
    }
  };

  useEffect(() => {
    if (!weather.weather) return;

    if (weather?.weather[0]?.main === "Clear") {
      setWeatherImage(`url(${sunny})`);
    } else if (weather?.weather[0]?.main === "Rain") {
      setWeatherImage(`url(${rain})`);
    } else {
      setWeatherImage(`url(${cloud})`);
    }
  }, [weather]);

  const fetchForCast = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/places/get-weather-forcast`,
        { placeName },
        {
          headers: {
            'Authorization':  `Bearer ${token}`
          }
        },
      );
      setForcast(data.forcastData?.list || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeather = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/places/get-weather",
        { placeName },
        {
          headers: {
            'Authorization':  `Bearer ${token}`
          }
        },
      );
      if (data.success) setWeather(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchForCast();
  }, [placeName]);

  return (
    <div className=" bg-gray-400 w-full h-full rounded-lg relative">
        <div className=" absolute w-full h-full bg-black/30"></div>
      <div className="w-full h-[75vh] my-12 bg-cover bg-center text-white" style={{ backgroundImage: weatherImage }}>
        {/* Header: Current Weather & Time */}
        <div className="p-2 lg:p-4 flex flex-col md:flex-row items-center justify-between border-b-2 border-white">
          <h1 className="font-semibold text-sm md:text-3xl ">Current Weather</h1>
          <div className="font-semibold text-xs md:text-2xl flex items-center gap-2 lg:gap-4">
            <p>{week[dayOfWeek]}</p>
            <p>{time}</p>
          </div>
        </div>

        {/* Weather Info */}
        <div className="lg:flex justify-between mx-4 ">
          {/* Temperature & Weather Condition */}
          <div className="flex flex-col mt-12 items-center text-center">
            <div className="flex items-center justify-center">
              <img className="w-[60px] sm:w-[80px] md:w-[100px] hidden" src={cloud} alt="cloud" />
              <div>
                <h1>
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold">{weather?.main?.temp || "__"}°</span>
                  <span className="text-xl sm:text-2xl md:text-4xl"> C</span>
                </h1>
                <h2 className="m-2 text-sm sm:text-base md:text-xl">Feels Like {weather?.main?.feels_like || "__"} °C</h2>
              </div>
            </div>
            <h1 className="mt-4 font-semibold text-lg sm:text-xl md:text-xl">Partially Sunny</h1>
          </div>
          
          {/* Weather Details */}
          <div className="w-fulll mt-12 font-bold mx-4">
            <div className="flex justify-between w-[100%] lg:w-[900px] border-b border-white pt-2 text-sm sm:text-base lg:text-3xl">
              <h1>Humidity</h1>
              <h1>{weather?.main?.humidity || "__"}%</h1>
            </div>
            <div className="flex justify-between w-[100%] lg:w-[900px] border-b border-white pt-2 text-sm sm:text-base lg:text-3xl">
              <h1>Wind</h1>
              <h1>{weather?.wind?.speed || "__"} Km/hr</h1>
            </div>
            <div className="flex justify-between w-[100%] lg:w-[900px] border-b border-white pt-2 text-sm sm:text-base lg:text-3xl">
              <h1>Pressure</h1>
              <h1>{weather?.main?.pressure || "__"} bar</h1>
            </div>
          </div>
        </div>

        {/* Forecast: Horizontal Scroll */}
        <div className="bottom-0 justify-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 w-full mt-8 px-6 py-4 lg:bottom-0 scrollbar-hide">
          {forcast.slice(0, 7).map((hour, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md min-w-[120px] sm:min-w-[140px] md:min-w-[150px] text-gray-900">
              <p className="text-xs sm:text-sm md:text-base font-semibold">
                {new Date(hour?.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              {getIcon(hour)}
              <p className="text-xs sm:text-sm md:text-lg font-bold">
                {Math.round(hour?.main?.temp) - 273}°C
              </p>
              <div className="flex items-center text-xs sm:text-sm text-gray-500">
                <Droplet className="w-4 h-4" />
                <span>{hour?.main?.humidity}%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Weather;
