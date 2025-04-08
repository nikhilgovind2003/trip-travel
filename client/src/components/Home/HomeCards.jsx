import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const HomeCards = ({ item }) => {
  const userId = localStorage.getItem("userId");
  const [likes, setLikes] = useState(item.likes);
  const [liked, setLiked] = useState(item.likes.includes(userId));

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [isHovered, setIsHovered] = useState(false);

  const visitPage = (id) => {
    userToken ? navigate(`/visit/${id}`) : toast.error("Please Login");
  };
  
  const handleLike = async () => {
    try {
      const {data} = await axios.put(
        `http://localhost:4000/api/v1/places/add-like/${item?._id}`,
        {userId},
        {
          headers: { Authorization: `Bearer ${userToken}` }, 
        }
      );

      setLikes(data.likes);
      setLiked(data.liked);
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };
  

  return (
    <>
      <div
        className="relative shadow-lg w-full overflow-hidden rounded-lg lg:rounded-[20px] h-64 lg:h-[400px]"
        style={{
          backgroundImage: `url(http://localhost:4000/${item?.images})`,
          backgroundSize: "cover", // Makes the image cover the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          width: "100%", // Set the width of the container

        }}
        onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}
        >
        <div className=" bg-black/50 z-60 absolute w-full h-full"></div>
        {/* Heart Icon */}
        <div
          onClick={() => setLikes((prev) => !prev)}
          className="absolute top-3 right-3 text-white lg:p-2 rounded-full cursor-pointer hover:bg-white/50 transition-all duration-500 ease-out"
        >

<div onClick={handleLike} className="">
          {liked ? <FaHeart size={30} className=" text-red-500" /> : <CiHeart size={30} />}
    </div>
        </div>

        <div className=" p-2 lg:p-4 absolute bottom-0 text-white">
          <div className="flex justify-between items-center">
            <h2 className=" ext-sm lg:text-xl font-bold shadow-md ">
              {item.placeName}
            </h2>
            <span className="flex items-center text-xs lg:text-lg justify-center">
              4.6
              <span className=" ml-2 mb-1 text-warning">
                <FaStar size={20} />
              </span>
            </span>
          </div>
          {/* Description */}
          <div
     
      className="transition-all duration-700 ease-in-out overflow-hidden"
    >
      <p
        className={`mt-2 text-xs lg:text-sm transition-all duration-700 ease-in-out ${
          isHovered ? "opacity-100 max-h-40" : "opacity-80 max-h-10"
        }`}
      >
        {isHovered
          ? item.description
      
          : item.description || "Lorem ipsum dolor sit amet, consectetur"}
      </p>
    </div>
          {/* Button */}
          <button
            onClick={() => visitPage(item._id)}
            className="mt-4 px-4 bg-transparent text-xs font-bold border-4 border-white rounded-full lg:text-lg text-white py-1 transition duration-300 ease-in-out hover:border-gray-300 hover:text-gray-300"
          >
            Visit Now
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000} // Auto close after 3 seconds
          hideProgressBar={true} // Optionally hide progress bar
          newestOnTop={false} // Toasts will appear at the bottom
        />
      </div>
    </>
  );
};

export default HomeCards;
