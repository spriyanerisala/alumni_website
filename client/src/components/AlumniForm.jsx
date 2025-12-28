/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import api from '../utils/api';
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AlumniForm = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    passedOutYear: "",
    branch: "",
    currentJobRole: "",
    company: "",
    jobLocation: "",
    linkedin: "",
    github: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post("alumni/add", formData);
      if (resp.data.success) {
        toast.success("Details Successfully Added");
        setFormData({
          rollNo: "",
          name: "",
          email: "",
          phone: "",
          gender: "",
          passedOutYear: "",
          branch: "",
          currentJobRole: "",
          company: "",
          jobLocation: "",
          linkedin: "",
          github: "",
        });
      } else {
        toast.error("Failed to add: " + resp.data.message);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 overflow-y-auto">
      <motion.div
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl font-semibold mb-6 text-center text-green-500"
          variants={formVariants}
        >
          Add Alumni
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
        >
          {[ 
            { id: "rollNo", label: "Roll No *", required: true },
            { id: "name", label: "Name *", required: true },
            { id: "email", label: "Email *", type: "email", required: true },
            { id: "phone", label: "Phone *", required: true },
            {
              id: "gender",
              label: "Gender *",
              isSelect: true,
              options: ["male", "female", "other"],
              required: true,
            },
            {
              id: "passedOutYear",
              label: "Passed Out Year *",
              type: "number",
              required: true,
              min: 1900,
              max: new Date().getFullYear() + 10,
            },
            { id: "branch", label: "Branch *", required: true },
            { id: "currentJobRole", label: "Current Job Role" },
            { id: "company", label: "Company" },
            { id: "jobLocation", label: "Job Location" },
            { id: "linkedin", label: "LinkedIn URL" },
            { id: "github", label: "GitHub URL" },
          ].map((field) => (
            <motion.div key={field.id} variants={formVariants}>
              <label
                htmlFor={field.id}
                className="block mb-1 font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.isSelect ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type || "text"}
                  placeholder={field.label}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              )}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div className="md:col-span-2 flex justify-center" variants={formVariants}>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-md transition"
            >
              Submit
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AlumniForm;
