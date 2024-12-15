import React, { useState, useEffect } from "react";
import axios from "axios";
import Jobcard from "./Jobcard";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { useAuth } from "../AuthContext";

export default function Jobs() {
  const { role } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    jobname: "",
    jobdescription: "",
    openings: "",
    companyname: "",
    salary: "",
    experience: "Entry Level",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getalljobs`
        );
        setJobs(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/jobs/createjob",
        newJob,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setJobs([...jobs, response.data.data]);
    } catch (err) {
      console.log(err.response.data);
      if (err.response) {
        console.error("Response data:", err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setShowAddJobModal(false);
      // Reset newJob state after adding
      setNewJob({
        jobname: "",
        jobdescription: "",
        openings: "",
        companyname: "",
        salary: "",
        experience: "Entry Level",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      {role === "admin" && (
        <button
          onClick={() => setShowAddJobModal(true)}
          className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Job
        </button>
      )}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Job</h3>
            {[
              "jobname",
              "jobdescription",
              "openings",
              "companyname",
              "salary",
            ].map((field) => (
              <input
                key={field}
                type={
                  field === "openings" || field === "salary" ? "number" : "text"
                }
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/name/, " Name")
                }
                value={newJob[field]}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    [field]: e.target.value,
                    // field === "openings" || field === "salary"
                    //   ? parseInt(e.target.value)
                    //   : e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
                min={field === "openings" ? 1 : undefined}
              />
            ))}
            <select
              value={newJob.experience}
              onChange={(e) =>
                setNewJob({ ...newJob, experience: e.target.value })
              }
              className="border p-2 mb-4 w-full"
            >
              {["Entry Level", "1-2 years", "3-5 years", "5+ years"].map(
                (exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                )
              )}
            </select>

            <div className="flex justify-end">
              <button
                onClick={handleAddJob}
                className="bg-green-600 text-white py-2 px-4 rounded mr-2"
              >
                Add Job
              </button>
              <button
                onClick={() => setShowAddJobModal(false)}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {jobs && jobs.length > 0 ? (
        jobs.map((job) => (
          <Jobcard
            key={job._id}
            jobName={job.jobname}
            jobDescription={job.jobdescription}
            openings={job.openings}
            companyName={job.companyname}
            salary={job.salary}
            experience={job.experience}
            jobId={job._id}
            setjobs={setJobs}
            Jobs={jobs}
          />
        ))
      ) : (
        <div className="text-center p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">No Jobs Available</h2>
          <p className="mt-2">
            We couldn't find any job listings at this time.
          </p>
        </div>
      )}
    </div>
  );
}
