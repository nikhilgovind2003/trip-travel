import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from 'react'

const LazyHomePage = React.lazy(() => import("./pages/HomePage"))
const LazyVisitPage = React.lazy(() => import("./pages/VisitPage"))

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookingPage from "./pages/BookingPage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./utils/PrivateRoute";
import AdminPage from "./pages/admin/AdminPage";
import { Suspense } from "react";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={["user", "admin"]}>
              <Suspense fallback={<h1>Loading...</h1>}
              >
                <LazyHomePage />
              </Suspense>
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
              <Suspense fallback={<h1>Loading...</h1>}
              >
                <LazyVisitPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
