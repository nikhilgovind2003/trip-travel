import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const AddReviews = ({ setAddReview, placeId }) => {
  const token = localStorage.getItem("token");

  // useStates
  const [form, setForm] = useState({
    reviewText: "",
    rating: 0,
    placeId: placeId,
  });

  const [error, setError] = useState({
    reviewText: "",
    rating: "",
  });

  const validateForm = () => {
    let valid = true;
    const newError = { reviewText: "", rating: "" };

    if (!form.reviewText.trim()) {
      newError.reviewText = "Review text cannot be empty";
      valid = false;
    }

    if (form.rating === 0) {
      newError.rating = "Please select a rating";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setForm((prev) => ({
      ...prev,
      rating: rating,
    }));
    setError((prev) => ({
      ...prev,
      rating: "",
    }));
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form is not valid");
      return;
    }
    try {
      await axios.post(
        "http://localhost:4000/api/v1/reviews/add-review",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddReview(false);
      window.location.reload(); // Refresh to show new review
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="p-6 bg-white rounded-xl shadow-lg w-[400px] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setAddReview(false)}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Add Review</h1>

        {/* Review Form */}
        <form onSubmit={submitReview}>
          {/* Review Text */}
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 mb-1">Review Text</label>
            <textarea
              value={form.reviewText}
              onChange={onHandleChange}
              name="reviewText"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your review here..."
            ></textarea>
            {error.reviewText && (
              <p className="text-sm text-red-500 mt-1">{error.reviewText}</p>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 mb-1">Rating</label>
            <div className="flex gap-2 text-yellow-400 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`transition ${
                    form.rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            {error.rating && (
              <p className="text-sm text-red-500 mt-1">{error.rating}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md shadow-md"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
