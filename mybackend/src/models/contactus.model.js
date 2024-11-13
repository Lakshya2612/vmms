import mongoose, { Schema } from "mongoose";
import validator from "validator";

const contactusSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
      minlength: [1, "Message must contain at least 1 character"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactusSchema);
