import { nearestPlaceModel, placeModel } from "../models/Models.js";
import mongoose from "mongoose";
import fs from "fs";
import axios from "axios";

export const addPlaces = async (req, res) => {
  const APIkey = process.env.WEATHER_API;
  const googleApiKey = process.env.GOOGLE_API;
  try {
    const { placeName, description, features } = req.body;

    if (!placeName || !description || !features) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: "No file found!" });
    }

    // Validate the file type (example for image files)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ message: "Invalid file type. Only image files are allowed." });
    }

    // Image path
    const imagePath = `uploads/places/${req.file.filename}`;

    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?name=${placeName}&apiKey=${googleApiKey}`
    );

    const long = data.features[0].properties.lon;
    const lat = data.features[0].properties.lat;

    // const { data } = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${process.env.WEATHER_API}`
    // );

    // const latitude = data.coord.lat;
    // const longitude = data.coord.lon;

    // Create a new place document
    const newPlace = new placeModel({
      city: data.features[0].properties.city,
      country: data.features[0].properties.country,
      placeName,
      state: data.features[0].properties.state,
      description,
      features,
      images: imagePath,
      location: {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      },
    });

    // Save the new place to the database
    await newPlace.save();
    // Return success response
    return res.status(200).json({
      success: true,
      message: "Place added successfully",
    });
  } catch (error) {
    console.error(error.message);
    // Return error response
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await placeModel.find();
    if (!places) return res.status(404).json({ message: "Places not found" });
    return res.status(200).json({
      success: true,
      places,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deletePlaces = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const prevData = await placeModel.findOne({ _id: id });
    if (prevData.images) {
      fs.unlink(prevData.images, (err) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "No file found!!!",
          });
        }
      });
    }

    const place = await placeModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePlaces = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!data)
      return res.status(400).json({ message: "No data provided for update" }); // 400 Bad Request

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const imagePath = req.file
      ? `uploads/places/${req.file.filename}`
      : undefined;

    const updateData = { ...data };
    if (req.file) {
      const prevData = await placeModel.findOne({ _id: id });
      if (prevData.images) {
        fs.unlink(prevData.images, (err) => {
          if (err) {
            return res.status(404).json({
              success: false,
              message: "No file found!!!",
            });
          }
        });
      }

      updateData.images = imagePath;
    }

    const place = await placeModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Data updated successfully...",
      place,
    });
    und;

    // Return the updated place
    res.status(200).json({ message: "Place updated successfully", place });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getSinglePlaceById = async (req, res) => {
  try {
    const { id, longitude, latitude } = req.params;
    const apikey = process.env.GOOGLE_API;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const place = await placeModel.findById(id).populate("hotels");

    if (!place && longitude && latitude) {
      var axios = require("axios");

      var config = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apikey}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return res.status(200).json({
      success: true,
      place,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getPlaces = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://google-map-places.p.rapidapi.com/maps/api/place/details/json",
    params: {
      place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      region: "en",
      fields: "all",
      language: "en",
      reviews_no_translations: "true",
    },
    headers: {
      "x-rapidapi-key": "b332b4753bmsh2e6cab9143663b7p14ed31jsn8bba2a673e9e",
      "x-rapidapi-host": "google-map-places.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data.resul);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getNearestPlaces = async (req, res) => {
  const { longitude, latitude, tourism, distance } = req.body;
  const googleApiKey = process.env.GOOGLE_API;
console.log(tourism)
  // const query = {}

  var config = {
    method: "get",
    url: `https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${longitude},${latitude},${distance}&limit=200&apiKey=${googleApiKey}`,
    headers: {},
  };
  try {
    if (!longitude || !latitude) {
      return res.status(404).json({
        success: false,
        message: "Longitude and Latitude are required",
      });
    }
    const { data } = await axios(config);
    let places = data.features;
    if (tourism) {
      places = places.filter(
        (place) => place.properties.datasource.raw.tourism === tourism
      );
    }
    res.status(200).json(places);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const getWeather = async (req, res) => {
  try {
    const { placeName } = req.body;
    const apiKey = process.env.WEATHER_API;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${apiKey}&units=metric`
    );
    if (data) {
      return res.status(201).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const getWeatherForcast = async (req, res) => {
  try {
    const { placeName } = req.body;
    const apiKey = process.env.WEATHER_API;

    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${placeName}&appid=${apiKey}`
    );

    if (data) {
      return res.status(201).json({
        success: true,
        forcastData: data,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
