import { hotelModel, placeModel } from "./../models/Models.js";
import axios from "axios";
import * as cheerio from "cheerio";


export const addHotels = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data) return res.status(404).json({ message: "Data not found" });
    const hotel = new hotelModel(data);
    await hotel.save();
    return res.status(200).json({
      success: true,
      message: "Hotel added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getNearestHotels = async (req, res) => {
  const googleApiKey = process.env.GOOGLE_API;
  const { longitude, latitude } = req.body;
  const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},2000&apiKey=${googleApiKey}`;
  const config = {
    method: "get",
    headers: {},
  };

  try {
    const {
      data: { features },
    } = await axios.get(url);

    if (features) {
      res.status(201).json({
        success: true,
        features,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      key: `https:api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},1000&apiKey=${googleApiKey}`,
    });
  }
};