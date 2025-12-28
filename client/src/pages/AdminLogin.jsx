/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from '../utils/api';
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/admin/login`, {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.adminToken);
        onLogin();
        toast.success("Admin Login Successfully");
        navigate("/admin/dashboard");
      } else {
        toast.error(res.data.message || "Invalid Credentials");
      }
    } catch (err) {
      toast.error(err.message);
      toast.error("Login Failed. Please check credentials or server.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-white shadow-lg rounded-lg w-full max-w-sm"
      >
        <motion.h2
          className="text-2xl font-bold mb-6 text-center text-green-600"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Admin Login
        </motion.h2>

        <motion.input
          type="email"
          placeholder="Email"
          className="border border-green-500 rounded-xl hover:border-green-500 outline-green-500 p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          required
        />

        <motion.input
          type="password"
          placeholder="Password"
          className="border border-green-500 rounded-xl hover:border-green-500 outline-green-500 p-2 w-full mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          required
        />

        <motion.button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
