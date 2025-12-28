/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";

import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from '../utils/api';
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({ name: "", rollNo: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        const { data } = await api.post("/user/login", {
          rollNo: formData.rollNo.trim(),
          password: formData.password,
        });

        if (data.success) {
          toast.success("Login Successful!");
          login(data.token);
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await api.post("/user/register", {
          name: formData.name,
          rollNo: formData.rollNo.trim(),
          password: formData.password,
        });

        if (data.success) {
          toast.success("Registered Successfully!");
          setState("login");
        } else {
          toast.error(data.message || "Register failed");
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    
     <div className="min-h-screen flex items-center justify-center border ">
       <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-green-500 rounded-2xl px-8 bg-white">
                <h1 className=" text-3xl mt-10  text-green-500 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-green-500  hover:border-green-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        <input type="text" name="name" placeholder="Name" className="border border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border  border-green-500  hover:border-green-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input type="text" name="rollNo" placeholder="Roll Number" className="border-none outline-none ring-0" value={formData.rollNo} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border  border-green-500  hover:border-green-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-indigo-500">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div>
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500  hover:bg-green-600 cursor-pointer transition-opacity">
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
            </form>
     </div>
  );
};

export default Login;

