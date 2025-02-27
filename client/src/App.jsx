import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VisitPage from "./pages/VisitPage";
import BookingPage from "./pages/BookingPage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./utils/PrivateRoute";
import AdminPage from "./pages/admin/AdminPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
cd 
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Admin-only Route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/book-now/:id"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/visit/:id"
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <VisitPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
