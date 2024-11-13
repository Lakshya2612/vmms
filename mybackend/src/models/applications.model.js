import mongoose, { Schema } from "mongoose";
import validator from "validator";

const applicationSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    photo: {
      type: Number,
      required: [true, "photo is required"],
    },
    resume: {
      type: String,
      required: [true, "resume is required"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
