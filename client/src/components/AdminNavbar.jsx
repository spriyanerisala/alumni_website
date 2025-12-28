/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleHomeClick = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
    setOpen(false);
    window.location.reload();
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="flex justify-between items-center px-8 py-4 border-b bg-white relative"
    >
      {/* Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-5xl font-semibold text-green-500"
      >
        Admin Dashboard
      </motion.h1>

      {/* Desktop menu */}
      <motion.div
        className="hidden sm:flex items-center gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <NavLink
          to="/"
          onClick={handleHomeClick}
          className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Home
        </NavLink>
        <NavLink
          to="/get-alumni-list"
          className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Alumni Students
        </NavLink>
        <NavLink
          to="/all-users"
          className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Users
        </NavLink>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </motion.div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex items-center px-3 py-2 border rounded text-green-500 border-green-500 hover:text-green-600 hover:border-green-600"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg
          className="fill-current h-6 w-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {open ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.364 5.636a1 1 0 010 1.414L13.414 12l4.95 4.95a1 1 0 11-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 11-1.414-1.414L10.586 12 5.636 7.05a1 1 0 111.414-1.414L12 10.586l4.95-4.95a1 1 0 011.414 0z"
            />
          ) : (
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="sm:hidden absolute top-full right-0 w-full bg-white shadow-md flex flex-col p-4 gap-4 z-50 border-t border-gray-200"
          >
            <NavLink
              to="/"
              onClick={handleHomeClick}
              className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 text-center"
            >
              Home
            </NavLink>
            <NavLink
              to="/get-alumni-list"
              className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 text-center"
              onClick={() => setOpen(false)}
            >
              Alumni Students
            </NavLink>
            <NavLink
              to="/all-users"
              className="border p-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 text-center"
              onClick={() => setOpen(false)}
            >
              Users
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all"
            >
              Logout
            </button>
           
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AdminNavbar;
