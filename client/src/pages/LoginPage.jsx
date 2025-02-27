import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/SignUpBg.png";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

function LoginPage() {
  // usestate
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/v1/auth/sign-in",
          formData
        );

        if (res.data.success) {
          toast("Login Successfully!!!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          const role = res.data.role;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("expiresIn", Date.now() + 72000);
          setTimeout(() => {
            if (role === "admin") {
              navigate("/admin");
            } else if (role === "user") {
              navigate("/");
            }
          }, 1000);
        } else {
          toast(res.data);
        }
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 min-w-full min-h-screen relative z-20"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute w-full h-screen z-30 backdrop-blur-sm"></div>

      <div className="w-full max-w-sm sm:max-w-md z-50 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Sign In
          </button>
          <div></div>
        </form>

        <div className="mt-4 text-center ">
          Don't have an account?
          <Link className=" text-primary underline " to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default LoginPage;
