import axios from "axios";
import { useEffect, useState } from "react";
import { GoPersonFill } from "react-icons/go";
import { Pen } from "lucide-react";
import AddReviews from "./AddReviews";
import { FaStar } from "react-icons/fa";

const Review = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [addReview, setAddReview] = useState(false);
  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/reviews/get-reviews",
        {
          params: { placeId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setReviews(data.reviews.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    document.body.style.overflow = addReview ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [addReview]);

  const newTime = (timestamp) => {
    const reviewDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - reviewDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-full flex items-center gap-2 shadow-lg"
          onClick={() => setAddReview(true)}
        >
          Add Review
          <Pen size={18} />
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 relative transition transform hover:scale-105 duration-300"
              key={index}
            >
              <div className="flex items-center justify-between gap-6">
                {/* User Info */}
                <div className="flex gap-3 items-center">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <GoPersonFill size={20} className="text-gray-700" />
                  </div>
                  <h1 className="font-medium text-gray-700">
                    {review?.user?.userName || "Anonymous"}
                  </h1>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} size={16} />
                  ))}
                </div>
              </div>

              <hr className="my-2 border-gray-200" />

              {/* Review Text */}
              <p className="text-gray-600 text-sm mb-3">{review.reviewText}</p>

              {/* Timestamp */}
              <h4 className="absolute bottom-2 right-2 text-gray-500 text-xs">
                {newTime(review.createdAt)}
              </h4>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No reviews yet. Be the first to leave one!
          </p>
        )}
      </div>

      {/* Review Modal */}
      {addReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <AddReviews setAddReview={setAddReview} placeId={placeId} />
        </div>
      )}
    </div>
  );
};

export default Review;
