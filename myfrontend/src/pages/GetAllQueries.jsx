import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Adminquerycard from "../components/Admin/Adminquerycard";
import axiosInstance from "../AxiosInstance";

export default function GetAllQueries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/contact/getallqueries",
          { withCredentials: true }
        );
        setQueries(response.data.data);
      } catch (err) {
        toast.error(err.data.message);
      }
    };

    fetchQueries();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Getting all queries
      </h1>
      <div className="flex flex-wrap gap-4 sm:justify-center">
        {queries.map((query) => (
          <Adminquerycard
            key={query._id}
            fullname={query.fullname}
            email={query.email}
            phone={query.phone}
            message={query.message}
          />
        ))}
      </div>
    </div>
  );
}
