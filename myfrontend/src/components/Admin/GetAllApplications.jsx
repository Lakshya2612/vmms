import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminapplicationcard from "./Adminappliationcard";
import { toast } from "react-toastify";

export default function GetAllApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "/api/v1/application/getallapplication"
        );
        setApplications(response.data.data);
      } catch (err) {
        toast.error(err.data.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">
        All Applications
      </h1>
      <div className="flex flex-wrap gap-4 sm:justify-center">
        {applications.map((application) => (
          <Adminapplicationcard
            key={application._id}
            firstname={application.firstname}
            lastname={application.lastname}
            email={application.email}
            phone={application.phone}
            photo={application.photo}
            resume={application.resume}
          />
        ))}
      </div>
    </div>
  );
}
