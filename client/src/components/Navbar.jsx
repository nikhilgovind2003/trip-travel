import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const logout = () => {
    toast("Log out Successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("expiresIn");
    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };

  return (
    <>
      <div
        className={`fixed backdrop-blur-xl flex z-50 w-full justify-between items-center px-4 lg:px-12 py-4 text-xl text-white ${
          fadeIn ? "navbar-animation bg-black/50" : ""
        }`}
      >
        <Link to="/" className="text-2xl font-bold">
          LOGO
        </Link>

        {/* Menu Toggle Icon */}
        <div
          className="block lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MdOutlineMenu size={30} />
        </div>

        {/* Menu Items */}

        <ul
          className={`lg:flex lg:gap-12 gap-6 justify-between lg:bg-transparent bg-black/70 items-center text-lg mt-4 lg:mt-0 transition-all duration-300
            ${fadeIn ? "navbar-animation" : ""}
            ${
              isOpen
                ? "flex flex-col absolute z-20 top-12 left-0  w-full p-4"
                : "hidden"
            }`}
        >
          <li className="lg:border-0 relative group">
            <Link to="/" className="">
              Home
            </Link>
            <div className="w-full absolute h-1 bg-white bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </li>
          <li className="lg:border-0 relative group">
            <Link to="/" className="">
              About Us
            </Link>
            <div className="w-full absolute h-1 bg-white bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </li>
          <li className="lg:border-0 relative group">
            <Link to="/" className="">
              Discover
            </Link>
            <div className="w-full absolute h-1 bg-white bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </li>

          <li>
            {userToken ? (
              <button
                onClick={logout}
                className="rounded-full px-4 py-1 border-2 cursor-pointer border-white text-lg font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="rounded-full px-8 py-1 border-2 border-white text-lg font-semibold"
              >
                Sign-In
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
