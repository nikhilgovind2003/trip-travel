import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    placeName: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    hotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels",
      },
    ],
    city: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    features: [],
    images: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timeseries: true,
  }
);

const pleceModel = mongoose.model("Place", placeSchema);
export default pleceModel;
