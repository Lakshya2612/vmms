import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// generating tokens

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens");
  }
};

// register user

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpendpoint = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    throw new ApiError(400, "please enter a valid email");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }
  const otp = await generateOTP();
  const otpExpire = Date.now() + 10 * 60 * 1000;
  const existingOtp = await Otp.findOne({ email });
  if (existingOtp) {
    await Otp.findOneAndUpdate({ email }, { otp, otpExpire }, { new: true });
  } else {
    await Otp.create({ email, otp, otpExpire });
  }
  const message = `Your OTP for registration is: ${otp}`;
  await sendEmail({
    email,
    subject: "Your OTP for Registration",
    message,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userOtp } = req.body;
  if ([name, email, password, userOtp].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already existed");
  }
  const otpRecord = await Otp.findOne({ email });
  if (
    !otpRecord ||
    otpRecord.otp !== req.body.otp ||
    otpRecord.otpExpire < Date.now()
  ) {
    throw new ApiError(400, "Invalid or expired OTP");
  }
  const user = await User.create({ name, email, password });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registring user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created Successfully"));
});

// login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUSer = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUSer,
          accessToken,
          refreshToken,
        },
        "user logged in succesfully"
      )
    );
});

// logout user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

// login user with tokens

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Please Login");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refresh succesfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// changing password

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!(newPassword === confirmPassword)) {
    throw new ApiError(400, "new password and confirm password is not same");
  }
  const user = await User.findById(req.user?.id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});

// current user

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetpassword/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;
  console.log(resetPasswordUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: "vmms password recovery",
      message: message,
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, {}, `Email sent to ${user.email} successfully`)
      );
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, "Email could not be sent, please try again.");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(
      404,
      "Reset Password Token is Invalid or has been expired"
    );
  }
  if (req.body.Password !== req.body.confirmPassword) {
    throw new ApiError(400, "password and confirm password is not same");
  }
  user.password = req.body.Password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res
    .status(200)
    .json(new ApiResponse(200, user, "password change successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  otpendpoint,
};
