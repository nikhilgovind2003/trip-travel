import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("token:", token);
  console.log("role:", role);
  console.log("allowedRoles:", allowedRoles);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (!Array.isArray(allowedRoles) || !allowedRoles.includes(role)) {
    // Redirect to unauthorized if the user is authenticated but doesn't have the required role.
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
