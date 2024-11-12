import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function ManageJobCard({
  jobName,
  jobDescription,
  openings,
  companyName,
  salary,
  experience,
  jobId,
  jobs,
  setJobs,
}) {
  const handleUpdateJob = async (id) => {
    const jobToUpdate = jobs.find((job) => job._id === id);
    const updatedJobName = prompt("Enter new job name:", jobToUpdate.jobname);
    if (updatedJobName) {
      try {
        await axios.put(`/api/v1/jobs/updatejob/${id}`, {
          jobname: updatedJobName,
        });
        setJobs(
          jobs.map((job) =>
            job._id === id ? { ...job, jobname: updatedJobName } : job
          )
        );
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  const handleDeleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/api/v1/jobs/deletejob/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold">{jobName}</h3>
      <p className="text-gray-700">{jobDescription}</p>
      <p className="mt-2">
        <strong>Openings:</strong> {openings}
      </p>
      <p className="mt-2">
        <strong>Company:</strong> {companyName}
      </p>
      <p className="mt-2">
        <strong>Salary:</strong> ${salary}
      </p>
      <p className="mt-2">
        <strong>Experience:</strong> {experience}
      </p>
      <div className="mt-4">
        <button
          onClick={() => handleUpdateJob(jobId)}
          className="text-blue-600 hover:underline mr-4"
        >
          <FaEdit /> Update Job
        </button>
        <button
          onClick={() => handleDeleteJob(jobId)}
          className="text-red-600 hover:underline"
        >
          <FaTrash /> Delete Job
        </button>
      </div>
    </div>
  );
}
