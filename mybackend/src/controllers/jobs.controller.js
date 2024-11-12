import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/jobs.model.js";

// creating jobs -- Admin

const createjob = asyncHandler(async (req, res) => {
  const { jobname, jobdescription, openings, companyname, salary, experience } =
    req.body;
  if (
    [jobname, jobdescription, openings, companyname, salary, experience].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const job = await Job.create({
    jobname,
    jobdescription,
    openings,
    companyname,
    salary,
    experience,
  });

  if (!job) {
    throw new ApiError(500, "something went wrong while creating job");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job created Successfully"));
});

// updating jobs -- Admin

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) {
    throw new ApiError(500, "Job not found");
  }
  const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedJob) {
    throw new ApiError(500, "Failed to update job");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedJob, "Job updated successfully"));
});

// deleting jobs -- Admin

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) {
    throw new ApiError(500, null, "Job not found");
  }
  await job.deleteOne();
  res.status(200).json(new ApiResponse(200, "job deleted successfully"));
});

// fetching jobs

const getalljobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

export { createjob, getalljobs, updateJob, deleteJob };
