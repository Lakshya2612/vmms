import React from "react";

export default function Adminquerycard({ fullname, email, phone, message }) {
  return (
    <div className="w-64 h-96 rounded-lg border border-gray-300 shadow-lg overflow-hidden p-4">
      <div className="text-xl font-semibold text-gray-800 mb-2">{fullname}</div>

      <div className="text-sm text-gray-600 mb-2">
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Phone:</strong> {phone}
        </div>
      </div>
      <div className="text-sm text-gray-800 mt-2">
        <strong>Message:</strong>
        <p className="text-gray-600 mt-1">{message}</p>
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-gray-500"></div>
    </div>
  );
}
