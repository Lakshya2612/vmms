import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import ManageJobCard from "./Managejobcard";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newJob, setNewJob] = useState({
    jobname: "",
    jobdescription: "",
    openings: "",
    companyname: "",
    salary: "",
    experience: "Entry Level", // Default value; change as necessary
  });
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/v1/jobs/getalljobs");
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
      const response = await axios.post("/api/v1/jobs/createjob", newJob);
      setJobs([...jobs, response.data.data]);
      setShowAddJobModal(false);
      setNewJob({
        jobname: "",
        jobdescription: "",
        openings: "",
        companyname: "",
        salary: "",
        experience: "Entry Level",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <button
        onClick={() => setShowAddJobModal(true)}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Job
      </button>

      {showAddJobModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Job</h3>
            <input
              type="text"
              placeholder="Job Name"
              value={newJob.jobname}
              onChange={(e) =>
                setNewJob({ ...newJob, jobname: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Job Description"
              value={newJob.jobdescription}
              onChange={(e) =>
                setNewJob({ ...newJob, jobdescription: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Openings"
              value={newJob.openings}
              onChange={(e) =>
                setNewJob({ ...newJob, openings: parseInt(e.target.value) })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={newJob.companyname}
              onChange={(e) =>
                setNewJob({ ...newJob, companyname: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Salary"
              value={newJob.salary}
              onChange={(e) =>
                setNewJob({ ...newJob, salary: parseInt(e.target.value) })
              }
              className="border p-2 mb-2 w-full"
            />
            <select
              value={newJob.experience}
              onChange={(e) =>
                setNewJob({ ...newJob, experience: e.target.value })
              }
              className="border p-2 mb-4 w-full"
            >
              <option value="Entry Level">Entry Level</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
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

      <div className="flex flex-wrap gap-4">
        {jobs.map((job) => (
          <ManageJobCard
            key={job._id}
            jobName={job.jobname}
            jobDescription={job.jobdescription}
            openings={job.openings}
            companyName={job.companyname}
            salary={job.salary}
            experience={job.experience}
            jobId={job._id}
            jobs={jobs}
            setJobs={setJobs}
          />
        ))}
      </div>
    </div>
  );
};

export default JobManagement;
