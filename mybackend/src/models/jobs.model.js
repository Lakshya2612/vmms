import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    jobname: {
      type: String,
      required: [true, "jobname is required"],
    },
    jobdescription: {
      type: String,
      required: [true, "jobdescription is required"],
    },
    openings: {
      type: Number,
      required: [true, "openings is required"],
    },
    companyname: {
      type: String,
      required: [true, "companyname is required"],
    },
    salary: {
      type: Number,
      required: [true, "salary is required"],
      min: 0,
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
      enum: ["Entry Level", "1-2 years", "3-5 years", "5+ years"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
