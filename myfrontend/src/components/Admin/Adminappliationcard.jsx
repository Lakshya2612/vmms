import React from "react";

export default function Adminapplicationcard({
  firstname,
  lastname,
  email,
  phone,
  photo,
  resume,
}) {
  return (
    <div className="w-64 h-96 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
      <a href={photo} target="_blank" rel="noopener noreferrer">
        <img src={photo} alt="Profile" className="w-full h-48 object-cover" />
      </a>
      <div className="p-4 h-48 flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {firstname} {lastname}
        </h2>

        <p className="text-gray-600 text-sm ">{email}</p>
        <p className="text-gray-600 text-sm ">{phone}</p>

        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline mt-2 inline-block text-sm"
        >
          View Resume
        </a>
      </div>
    </div>
  );
}
