import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { useAuth } from "../AuthContext";

export default function JobCard({
  jobname,
  jobdescription,
  openings,
  companyname,
  salary,
  experience,
  jobId,
  setjobs,
  Jobs,
}) {
  const { role } = useAuth();
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editJobData, setEditJobData] = useState({
    jobname,
    jobdescription,
    openings,
    companyname,
    salary,
    experience,
  });

  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate(`/apply/${jobId}`);
  };

  const handleEditClick = () => {
    setShowEditJobModal(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/jobs/deletejob/${jobId}`,
        { withCredentials: true }
      );
      setjobs(Jobs.filter((job) => job._id !== jobId));
      toast.success(response.data.message);
    } catch (err) {
      console.log(err.response.data);
      toast.error(
        err.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const handleSaveEdit = async () => {
    try {
      console.log(editJobData);
      const response = await axiosInstance.put(
        `/api/v1/jobs/updatejob/${jobId}`,
        editJobData,
        { withCredentials: true }
      );
      console.log(response);
      setjobs(
        Jobs.map((job) =>
          job._id === jobId ? { ...job, ...editJobData } : job
        )
      );
      toast.success(response.data.message);
      setShowEditJobModal(false);
    } catch (err) {
      console.error(err.response?.data);
      toast.error(
        err.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="m-4 p-4 rounded-lg bg-[#f9f9f9] border border-[#ccc] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h2 className="m-0 text-[1.5rem] font-semibold">{jobname}</h2>
      <p className="text-[#555]">{jobdescription}</p>
      <div className="mt-4">
        <p>
          <strong>Openings:</strong> {openings}
        </p>
        <p>
          <strong>Company:</strong> {companyname}
        </p>
        <p>
          <strong>Salary:</strong> {salary}
        </p>
        <p>
          <strong>Experience:</strong> {experience}
        </p>
      </div>

      <div className="mt-4 flex space-x-2 justify-start">
        <button
          onClick={handleApplyClick}
          className="flex items-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-200 w-auto"
        >
          <FaPaperPlane className="mr-2" /> Apply
        </button>
        {role === "admin" && (
          <button
            onClick={handleEditClick}
            className="flex items-center bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 transition duration-200 w-auto"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
        )}
        {role === "admin" && (
          <button
            onClick={handleDeleteClick}
            className="flex items-center bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-200 w-auto"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        )}
      </div>

      {showEditJobModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Job</h3>
            <input
              type="text"
              placeholder="Job Name"
              value={editJobData.jobname}
              onChange={(e) =>
                setEditJobData({ ...editJobData, jobname: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Job Description"
              value={editJobData.jobdescription}
              onChange={(e) =>
                setEditJobData({
                  ...editJobData,
                  jobdescription: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Openings"
              value={editJobData.openings}
              onChange={(e) =>
                setEditJobData({ ...editJobData, openings: e.target.value })
              }
              className="border p-2 mb-2 w-full"
              min="1"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={editJobData.companyname}
              onChange={(e) =>
                setEditJobData({ ...editJobData, companyname: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Salary"
              value={editJobData.salary}
              onChange={(e) =>
                setEditJobData({ ...editJobData, salary: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <select
              value={editJobData.experience}
              onChange={(e) =>
                setEditJobData({ ...editJobData, experience: e.target.value })
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
                onClick={handleSaveEdit}
                className="bg-green-600 text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditJobModal(false)}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
