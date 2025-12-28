
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import api from '../utils/api';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/all-users");
        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch users");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Users List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border text-green-500">Name</th>
            <th className="p-2 border text-green-500">Roll Number</th>
            <th className="p-2 border text-green-500">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="text-center border font-medium cursor-pointer"
              >
                <td className="p-2 border font-medium">{user.name}</td>
                <td className="p-2 border font-medium">{user.rollNo}</td>
                <td className="p-2 border font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
