import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/applications.model.js";
import { fileupload } from "../utils/fileupload.js";

const submitapplication = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const { id: UserId } = req.user;
  const { jobId } = req.params;
  if (
    [firstname, lastname, email, phone].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingApplication = await Application.findOne({ UserId, jobId });
  if (existingApplication) {
    throw new ApiError(400, "Application already exists for this job");
  }
  if (req.body.email !== req.user.email) {
    throw new ApiError(400, "Please use your own email");
  }
  if (!req.files.photo) {
    throw new ApiError(400, "photo is required");
  }
  if (!req.files.resume) {
    throw new ApiError(400, "resume is required");
  }
  const photo = await fileupload(req.files.photo[0]);
  const resume = await fileupload(req.files.resume[0]);
  if (!photo) {
    throw new ApiError(400, "Photo upload failed");
  }
  if (!resume) {
    throw new ApiError(400, "Resume upload failed");
  }
  const application = await Application.create({
    firstname,
    lastname,
    email,
    phone,
    photo: photo.url,
    resume: resume.url,
    jobId,
    UserId,
  });
  const createdApplication = await Application.findById(application._id);
  if (!createdApplication) {
    throw new ApiError(
      500,
      "something went wrong while submitting the application"
    );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdApplication,
        "Application submitted successfully"
      )
    );
});

const getallapplication = asyncHandler(async (req, res) => {
  const applications = await Application.find();
  return res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Applications fetched successfully")
    );
});

export { submitapplication, getallapplication };
