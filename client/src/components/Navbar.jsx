import { useEffect, useState } from "react";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userToken = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(isAuthenticated)
  useEffect(() => {
    setFadeIn(true);

    // Move navigation logic here
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);


  const logout = () => {
    toast.success("Logged out Successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };


  
  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-500 backdrop-blur-lg ${
          fadeIn ? "bg-white/30 shadow-lg" : "bg-transparent"
        }`}
      >
        <Link to="/" className="text-3xl font-bold text-black">
          <span className="text-indigo-600">Trip </span>Travel
        </Link>

        {/* Menu Toggle Icon */}
        <div className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose size={30} /> : <MdOutlineMenu size={30} />}
        </div>

        {/* Menu Items */}
        <ul
          className={`lg:flex lg:gap-10 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none text-lg text-gray-800 font-medium transition-all duration-300 ${
            isOpen ? "flex flex-col p-4" : "hidden lg:flex"
          }`}
        >
          <li className="group relative">
            <Link to="/" className="px-4 py-2 block">
              Home
            </Link>
            <div className="w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </li>

          {role === "admin" ? (
            <li className="group relative">
              <Link to="/dashBoard" className="px-4 py-2 block">
                Dashboard
              </Link>
              <div className="w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </li>
          ) : (
            <li className="group relative">
              <Link to="/about" className="px-4 py-2 block">
                About Us
              </Link>
              <div className="w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </li>
          )}

          <li className="group relative">
            <Link to="/discover" className="px-4 py-2 block">
              Discover
            </Link>
            <div className="w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </li>

          <li className="mt-4 lg:mt-0">
            {userToken || isAuthenticated? (
              <button
                onClick={logout}
                className="px-6 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="px-6 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Navbar;