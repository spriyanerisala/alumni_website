

import {  Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";

import AlumniForm from "./components/AlumniForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/UserList";
import { useEffect, useState } from "react";
import MyProfile from "./pages/MyProfile";




function App() {
  const [isAdmin,setIsAdmin] = useState(false)


   useEffect(()=>{
    const token = localStorage.getItem("adminToken")
    setIsAdmin(!!token)

  },[])


  const handleAdminLogin = ()=>{
    setIsAdmin(true)
  }
 const handleAdminLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAdmin(false)
    window.location.reload()
 }
 
      

  return (
    <div>
     
    
      {/* Show admin or user navbar */}
      {isAdmin ? <AdminNavbar logout={handleAdminLogout} /> : <Navbar />}
       
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
         <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/admin/login"  element={<AdminLogin onLogin={handleAdminLogin} />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Other routes */}
        <Route path="/all-users" element={<UserList />} />
        <Route path="/addAlumni" element={<AlumniForm />} />
        <Route path="/get-alumni-list" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
