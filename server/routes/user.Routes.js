import express from "express";
import {
  resetPassword,
  sendOtp,
  verifyOtp,
  login,
  register,
  getUsers,
} from "../controllers/user.Controller.js";

import passport from "../middlewares/passport.Middleware.js";


const router = express.Router();

router.route('/auth/google').get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.post("/sign-in", login);
router.post("/sign-up", register);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/get-users", getUsers);


export default router;
