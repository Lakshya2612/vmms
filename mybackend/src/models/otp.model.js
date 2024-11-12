import mongoose, { Schema } from "mongoose";
import validator from "validator";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    otp: {
      type: String,
      required: [true, "Otp is required"],
    },
    otpExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);
