import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sun, CloudSun, Moon, Droplet, Wind, Thermometer } from "lucide-react";
import { format } from "date-fns";

const Weather = ({ placeName }) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [time, setTime] = useState("");

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = new Date().getDay();

  const token = localStorage.getItem("token");

  // Update current time
  useEffect(() => {
    const updateClock = () => {
      const dt = new Date();
      setTime(dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (hour) => {
    const currentHour = new Date(hour?.dt_txt).getHours();
    const isNight = currentHour > 18 || currentHour < 6;

    if (isNight) return <Moon className="text-gray-400 w-8 h-8" />;

    switch (hour?.weather[0]?.main) {
      case "Clear":
        return <Sun className="text-yellow-400 w-8 h-8" />;
      case "Clouds":
        return <CloudSun className="text-blue-400 w-8 h-8" />;
      case "Rain":
        return <Droplet className="text-blue-500 w-8 h-8" />;
      default:
        return <Sun className="text-yellow-400 w-8 h-8" />;
    }
  };

  // Fetch weather and forecast data
  const fetchWeather = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/places/get-weather",
        { placeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setWeather(data.data);
        // Change background color based on weather
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchForecast = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/places/get-weather-forcast",
        { placeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForecast(data.forcastData?.list || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [placeName]);

  return (
    <div>

      <div className=" w-full bg-white rounded-2xl shadow-lg p-8">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">{placeName}</h1>
            <p className="text-gray-500">{week[dayOfWeek]}, {time}</p>
          </div>
          <div className="text-2xl font-semibold">
            {weather?.main?.temp || "__"}°C
          </div>
        </div>

        {/* Current Weather Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-6 bg-blue-100 rounded-lg shadow-md">
            <Thermometer className="w-10 h-10 text-blue-500" />
            <div className="text-right">
              <p className="text-lg font-bold">Feels Like</p>
              <p className="text-2xl">{weather?.main?.feels_like || "__"}°C</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-green-100 rounded-lg shadow-md">
            <Droplet className="w-10 h-10 text-green-500" />
            <div className="text-right">
              <p className="text-lg font-bold">Humidity</p>
              <p className="text-2xl">{weather?.main?.humidity || "__"}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-yellow-100 rounded-lg shadow-md">
            <Wind className="w-10 h-10 text-yellow-500" />
            <div className="text-right">
              <p className="text-lg font-bold">Wind Speed</p>
              <p className="text-2xl">{weather?.wind?.speed || "__"} km/h</p>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        <h2 className="text-3xl font-bold mt-10 mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {forecast?.slice(0, 7).map((hour, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 shadow-md hover:scale-105 transition-transform"
            >
              <p className="text-lg font-bold">
                {format(new Date(hour?.dt_txt), "EEEE")}
              </p>
              <p className="text-gray-500">
                {format(new Date(hour?.dt_txt), "h:mm a")}
              </p>
              <div className="flex items-center justify-between mt-2">
                {getIcon(hour)}
                <p className="text-2xl font-bold">{Math.round(hour?.main?.temp - 273)}°C</p>
              </div>
              <p className="text-sm text-gray-600">
                Humidity: {hour?.main?.humidity}%
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Weather;
