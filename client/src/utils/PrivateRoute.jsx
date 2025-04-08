import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
    return children;
};

export default PrivateRoute;
