import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    hotelName: { type: mongoose.Schema.Types.ObjectId, ref: "Hotels" },
    transactionId: { type: String, required: true },
    date: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
export default bookingModel;
