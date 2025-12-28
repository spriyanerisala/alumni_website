import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../assets/assets";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "admin") {
      navigate("/admin/login");
    }
    // if "user" is selected, do nothing or reset page if you want
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 border-b bg-white border-b-white">
      <Link to="/">
        <img
          className="w-10 h-10"
          style={{ transform: "scale(1.5)" }}
          src={assets.siddarth_logo}
          alt="Logo"
        />
      </Link>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center gap-6">
        <NavLink to="/" className="hover:text-green-500">
          Home
        </NavLink>
       

        <NavLink to="/about" className="hover:text-green-500">
          About
        </NavLink>

         {
          isLoggedIn && ( <NavLink to="/addAlumni" className="hover:text-green-500">
            Details
          </NavLink> )
         }
         
        
         {isLoggedIn && (
          <NavLink to="/my-profile" className="hover:text-green-500">
            My Profile
          </NavLink>
        )}

        {/* Role selector */}
        <select
          onChange={handleRoleChange}
          defaultValue="user"
          className="px-3 py-1 rounded border cursor-pointer  border-green-500 bg-green-500 border-b-white text-white font-medium outline-none border-none"
        >
          <option className="border-none border-green-500 cursor-pointer outline-none border-b-white font-medium" value="user">User</option>
          <option className="border-none border-green-500 cursor-pointer outline-none border-b-white font-medium " value="admin">Admin</option>
        </select>

   
       


        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
              Login
            </button>
          </NavLink>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {/* Hamburger icon */}
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0" width="24" height="3" fill="#333" />
          <rect y="8.5" width="24" height="3" fill="#333" />
          <rect y="17" width="24" height="3" fill="#333" />
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col p-4 sm:hidden z-50 gap-4">
          <NavLink
            to="/"
            className="py-2"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="py-2"
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/addAlumni"
              className="py-2"
              onClick={() => setOpen(false)}
            >
              Details
            </NavLink>
          )}

          {/* Role selector for mobile */}
          <select
            onChange={(e) => {
              handleRoleChange(e);
              setOpen(false);
            }}
            defaultValue="user"
            className="px-3 py-1 rounded border border-gray-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
            >
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

