import mongoose from "mongoose";


const nearestPlaceSchema = new mongoose.Schema({
    name: String,
    country: String,
    country_code: String,
    state: String,
    city: String,
    street: String,
    postcode: String,
    longitude: Number,
    latitude: Number,
    address: String,
    contact: {
      phone: String,
      email: String
    },
    categories: [String],
    opening_hours: String,
    facilities: {
      internet_access: Boolean
    },
    website: String,
    place_id: String,
    geometry: {
      type: { type: String },
      coordinates: [Number]
    },
}, {timestamps: true})


const nearestPlaceModel = mongoose.model('NearestPlace', nearestPlaceSchema)
export default nearestPlaceModel