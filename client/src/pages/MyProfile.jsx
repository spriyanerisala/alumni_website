/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast, Toaster} from 'react-hot-toast'
const MyProfile = () => {
  const [alumni, setAlumni] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:5000/api/alumni/my-profile",
          config
        );

        if (response.data.success) {
          setAlumni(response.data.data);
          setFormData(response.data.data);
        } else {
          setError(response.data.message || "Failed to load profile.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(
        "http://localhost:5000/api/alumni/update-profile",
        formData,
        config
      );
      if (response.data.success) {
        setAlumni(response.data.data);
        setEditable(false);
        toast.success("Profile Updated Successfully")
      } else {
        alert("Update failed: " + response.data.message);
      }
    } catch (err) {
      alert(
        "Error updating profile: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your profile? This action cannot be undone."
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       const response = await axios.delete(
//         "http://localhost:5000/api/alumni/delete-profile",
//         config
//       );

//       if (response.data.success) {
//         toast.success("Profile deleted successfully.");
//         localStorage.removeItem("token");
//         window.location.href = "/";
//       } else {
//         alert("Failed to delete profile: " + response.data.message);
//       }
//     } catch (err) {
//       alert(
//         "Error deleting profile: " +
//           (err.response?.data?.message || err.message)
//       );
//     }
//   };


const confirmDeleteToast = (onConfirm, onCancel) => {
  const ToastContent = () => (
    <div>
      <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
      <div className="mt-2 flex justify-end space-x-2">
        <button
          onClick={() => {
            toast.dismiss();
            onCancel();
          }}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );

  toast(<ToastContent />, {
    position: "top-center",
    duration: Infinity,
    closeOnClick: false,
  });
};


const handleDelete = () => {
  confirmDeleteToast(
    async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.delete(
          "http://localhost:5000/api/alumni/delete-profile",
          config
        );

        if (response.data.success) {
          toast.success("Profile deleted successfully.");
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          toast.error("Failed to delete profile: " + response.data.message);
        }
      } catch (err) {
        toast.error(
          "Error deleting profile: " + (err.response?.data?.message || err.message)
        );
      }
    },
    () => {
      toast.info("Delete cancelled.");
    }
  );
};

  const handleCancel = () => {
    setFormData(alumni);
    setEditable(false);
  };

  if (loading)
    return <div className="text-center mt-10">Loading profile...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 mt-10">Error: {error}</div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <Toaster/>
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
        My Profile
      </h2>

      <table className="w-full text-sm sm:text-base text-left text-gray-800 border-collapse">
        <tbody>
          {renderRow("Name", "name", formData.name, editable, handleChange)}
          {renderRow("Roll No", "rollNo", formData.rollNo, false)}
          {renderRow("Email", "email", formData.email, false)}
          {renderRow("Phone", "phone", formData.phone, editable, handleChange)}
          {renderRow("Gender", "gender", capitalize(formData.gender), false)}
          {renderRow(
            "Passed Out Year",
            "passedOutYear",
            formData.passedOutYear,
            false
          )}
          {renderRow("Branch", "branch", formData.branch, false)}
          {renderRow(
            "Current Job Role",
            "currentJobRole",
            formData.currentJobRole || "N/A",
            editable,
            handleChange
          )}
          {renderRow(
            "Company",
            "company",
            formData.company || "N/A",
            editable,
            handleChange
          )}
          {renderRow(
            "Job Location",
            "jobLocation",
            formData.jobLocation || "N/A",
            editable,
            handleChange
          )}
          {renderRow(
            "LinkedIn",
            "linkedin",
            formData.linkedin || "N/A",
            editable,
            handleChange,
            true
          )}
          {renderRow(
            "GitHub",
            "github",
            formData.github || "N/A",
            editable,
            handleChange,
            true
          )}
        </tbody>
      </table>

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        {!editable ? (
          <div className="flex gap-6">
            <button
              onClick={() => setEditable(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
            >
              Delete Profile
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Render table row (label and value or input)
const renderRow = (label, name, value, editable, onChange, isLink = false) => (
  <tr className="border-b border-gray-200">
    <td className="py-3 pr-4 font-semibold text-green-700 w-1/3">{label}:</td>
    <td className="py-3">
      {editable ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      ) : isLink && value !== "N/A" ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-words"
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </td>
  </tr>
);

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default MyProfile;
