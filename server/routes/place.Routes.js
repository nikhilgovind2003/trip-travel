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
import placeUpload from "./../utils/palce.Storage.js";
import { jwtToken } from './../middlewares/verifyToken.js';
const router = express.Router();

router.post("/add-places", jwtToken, addPlaces);
router.get("/get-all-places", getAllPlaces);
router.get("/get-places", jwtToken, getPlaces);
router.delete("/remove-places/:id", jwtToken, deletePlaces);
router.patch("/update-place/:id", jwtToken, placeUpload.single("file"), updatePlaces);
router.get("/get-place-by-id/:id", jwtToken, getSinglePlaceById);
router.get("/add-places", jwtToken, placeUpload.single("file"), addPlaces);
router.post("/get-nearest-places",jwtToken, getNearestPlaces)
router.put("/add-like/:id",jwtToken, addLike)
router.get("/most-liked-place",getMostLikedPlaces)

router.post("/get-weather", jwtToken, getWeather)
router.post("/get-weather-forcast", jwtToken, getWeatherForcast)



router.post("/sample", async (req, res) => {
  // try {
  //   const { longitude, latitude } = req.body;
  //   const googleApiKey = process.env.GOOGLE_API;
  //   const existingData = await nearestPlaceModel.find({ longitude, latitude });
    
  //   if (existingData.length > 0) {
  //     res.status(200).json({
  //       success: true,
  //       data: existingData,
  //     });
  //   } else {
  //     var config = {
  //       method: "get",
  //       url: `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${longitude},${latitude},1000&apiKey=${googleApiKey}`,
  //       headers: {},
  //     };

  //     const { data } = await axios.request(config);
  //     res.json(data.features);
  //     const features = data.features;
  //     for (let feature of features) {
  //       const { properties, geometry } = feature;
  //       const newFeature = new nearestPlaceModel({
  //         name: properties.name,
  //         country: properties.country,
  //         country_code: properties.country_code,
  //         state: properties.state,
  //         city: properties.city,
  //         street: properties.street,
  //         postcode: properties.postcode,
  //         longitude: properties.lon,
  //         latitude: properties.lat,
  //         address: properties.formatted,
  //         contact: {
  //           phone: properties.contact ? properties.contact.phone : null,
  //           email: properties.contact ? properties.contact.email : null,
  //         },
  //         categories: properties.categories,
  //         opening_hours: properties.opening_hours,
  //         facilities: {
  //           internet_access:
  //             (properties.facilities &&
  //               properties.facilities.internet_access) ||
  //             false,
  //         },
  //         website: properties.website || null,
  //         place_id: properties.place_id,
  //         geometry: {
  //           type: geometry.type,
  //           coordinates: geometry.coordinates,
  //         },
  //       });

  //       // Save to MongoDB
  //       await newFeature.save();
  //       console.log(`Feature ${properties.name} saved successfully.`);
  //     }
  //   }


  // } catch (error) {
  //   res.json(error);
    // }
    
  
  const apikey = process.env.GOOGLE_API
  console.log(apikey)
  
    var requestOptions = {
      method: 'GET',
    };
    
    fetch(`https://api.geoapify.com/v2/place-details?id=id%3D514d368a517c511e40594bfd7b574ec84740f00103f90135335d1c00000000920313416e61746f6d697363686573204d757365756d&apiKey=${apikey}`, requestOptions)
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(error => console.log('error', error));

});
export default router;
