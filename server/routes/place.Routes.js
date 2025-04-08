import express from "express";
import {
  deletePlaces,
  getAllPlaces,
  updatePlaces,
  getSinglePlaceById,
  addPlaces,
  getPlaces,
  getNearestPlaces,
  getWeather,
  getWeatherForcast,
  addLike,
  getMostLikedPlaces,
} from "./../controllers/place.Controller.js";
import { placeUpload } from "../utils/index.js";
import { jwtToken } from "./../middlewares/index.js";
const router = express.Router();

router.post("/add-places", jwtToken, addPlaces);
router.get("/get-all-places", getAllPlaces);
router.get("/get-places", jwtToken, getPlaces);
router.delete("/remove-places/:id", jwtToken, deletePlaces);
router.patch(
  "/update-place/:id",
  jwtToken,
  placeUpload.single("file"),
  updatePlaces
);
router.get("/get-place-by-id/:id", jwtToken, getSinglePlaceById);
router.get("/add-places", jwtToken, placeUpload.single("file"), addPlaces);
router.post("/get-nearest-places", jwtToken, getNearestPlaces);
router.put("/add-like/:id", jwtToken, addLike);
router.get("/most-liked-place", getMostLikedPlaces);

router.post("/get-weather", jwtToken, getWeather);
router.post("/get-weather-forcast", jwtToken, getWeatherForcast);


export default router;
