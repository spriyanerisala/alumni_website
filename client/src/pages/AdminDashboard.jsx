/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import api from '../utils/api';
const AdminDashboard = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  // Fetch alumni list
  const fetchList = async () => {
    try {
      const resp = await api.get("/admin/students");
      if (resp.data.success) {
        setList(resp.data.data);
      } else {
        setError("Failed: " + resp.data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">
        Alumni List
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">RollNo</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Year</th>
            <th className="py-3 px-4 text-left">Branch</th>
            <th className="py-3 px-4 text-left">Job Role</th>
            <th className="py-3 px-4 text-left">Company</th>
            <th className="py-3 px-4 text-left">Location</th>
            <th className="py-3 px-4 text-left">LinkedIn</th>
            <th className="py-3 px-4 text-left">GitHub</th>
            <th className="py-3 px-4 text-left">Joined</th>
          </tr>
        </thead>



<tbody>
  {list.length === 0 ? (
    <tr>
      <td colSpan="13" className="text-center py-6 text-gray-500">
        No alumni found.
      </td>
    </tr>
  ) : (
    list.map((al) => (
      <tr
        key={al._id}
        className="border-t border-gray-300 hover:bg-gray-50 transition"
      >
        <td className="py-2 px-4">{al.name}</td>
        <td className="py-2 px-4 uppercase">{al.rollNo}</td> {/* Show rollNo here */}
        <td className="py-2 px-4">{al.email}</td>
        <td className="py-2 px-4">{al.phone}</td>
        <td className="py-2 px-4 capitalize">{al.gender}</td>
        <td className="py-2 px-4">{al.passedOutYear}</td>
        <td className="py-2 px-4 uppercase">{al.branch}</td>
        <td className="py-2 px-4">{al.currentJobRole || "N/A"}</td>
        <td className="py-2 px-4">{al.company || "N/A"}</td>
        <td className="py-2 px-4">{al.jobLocation || "N/A"}</td>
        <td className="py-2 px-4">
          {al.linkedin ? (
            <a
              href={al.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td className="py-2 px-4">
          {al.github ? (
            <a
              href={al.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              GitHub
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td className="py-2 px-4 text-gray-600 text-sm">
          {new Date(al.createdAt).toLocaleDateString()}
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
};

export default AdminDashboard;
