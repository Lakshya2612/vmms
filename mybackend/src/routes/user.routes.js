import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  otpendpoint,
} from "../controllers/user.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/send-otp").post(otpendpoint);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);

// secures route
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshtoken").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);

export default router;
