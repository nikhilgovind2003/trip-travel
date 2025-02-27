import mongoose from 'mongoose';

const hotelScheme = new mongoose.Schema({
    hotelName: { type: String },
    rating: {type: Number},
    price: { type: Number },
    place: { type: String, ref: "Place" },
    features: [],
    Reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
    }],
    
},{timestamps:true})


const hotelModel = mongoose.model("Hotels", hotelScheme);
export default hotelModel