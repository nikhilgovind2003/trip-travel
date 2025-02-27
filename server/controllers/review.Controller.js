import { placeModel, reviewModel } from "../models/Models.js";

export const addReview = async (req, res) => {
  try {
    const { rating, reviewText, placeId } = req.body;

    if (!rating || !reviewText)
      return res.json({
        success: false,
        message: "All fields are required!!!",
      });

    let place = await placeModel.findById(placeId);
    if (!place)
      return res.json({ success: false, message: "No place found!!!" });

    const userId = req.user.id;
    const newReview = await reviewModel.create({
      user: userId,
      rating,
      reviewText,
    });

    await newReview.save();

    place.reviews.push(newReview._id);
    await place.save();

    res.json({
      success: true,
      message: "Review added succesfully...",
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { placeId } = req.query;

    const place = await placeModel
      .findById(placeId)
      .select("reviews")
      .populate({
        path: "reviews",
        options: { sort: {createdAt: -1}},
        populate: {
          path: "user",
          select: "-_id userName",
        },
      });

    
    
    res.status(201).json({
      success: true,
      reviews: place
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId, placeId } = req.body;

    const reviewData = await placeModel.findByIdAndUpdate(
      placeId,
      {
        $pull: { reviews: reviewId }
      },
      { new: true }
    );

    const review = await reviewModel.findByIdAndDelete(reviewId);

    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.status(201).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const {  reviewText, rating, userId } = req.body


    await reviewModel.findByIdAndUpdate(userId, {
      reviewText: reviewText,
      rating: rating
    },
    {new: true})


    res.status(201).json({
      success: true,
      message: "Review updated successfully"
    })
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};
