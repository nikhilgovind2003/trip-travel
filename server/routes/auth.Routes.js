import passport from "../middlewares/passport.Middleware.js";
import { handleGoogleCallback, handleLogout, loginSuccess } from "../controllers/auth/auth.controller.js";
import { googleAuthCallback, logoutUser } from "../middlewares/googleAuth.middleware.js";
import express from "express";
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/google/callback", googleAuthCallback, handleGoogleCallback);
router.route("/login/success").get(loginSuccess);
router.route("/logout").get(logoutUser, handleLogout);

export default router;
