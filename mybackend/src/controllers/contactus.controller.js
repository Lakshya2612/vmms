import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contactus.model.js";

const submitquery = asyncHandler(async (req, res) => {
  const { fullname, email, phone, message } = req.body;
  const userId = req.user?.id;
  if ([fullname, email, phone, message].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (req.body.email !== req.user.email) {
    throw new ApiError(400, "Please use your own email");
  }
  const query = await Contact.create({
    fullname,
    email,
    phone,
    message,
    UserId: userId,
  });

  if (!query) {
    throw new ApiError(500, "something went wrong while submiting query");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, query, "query submitted Successfully"));
});

const getallqueries = asyncHandler(async (req, res) => {
  const queries = await Contact.find();
  return res
    .status(200)
    .json(new ApiResponse(200, queries, "Queries fetched successfully"));
});

export { submitquery, getallqueries };
