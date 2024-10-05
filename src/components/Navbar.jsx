import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlayCircle,
  AiOutlineInfoCircle,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai"; // Icons
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
      }
      window.location.reload();
    });
  };

  return (
    <div
      className={`min-h-screen bg-background-secondary text-secondary-text flex flex-col justify-between ${
        isOpen ? "w-[15rem]" : "w-[4rem]"
      } transition-all duration-300 relative`}
    >
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <button onClick={toggleNavbar} className="p-3">
          {isOpen ? (
            <AiOutlineClose className="text-2xl" />
          ) : (
            <AiOutlineMenu className="text-2xl text-main-text" />
          )}
        </button>

        {/* Logo Section */}
        <div
          className={`flex items-center ${
            isOpen ? "justify-start space-x-2" : "justify-center"
          } p-4 text-xl font-bold`}
        >
          {isOpen && <span>Sh_player</span>}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
            activeClassName="bg-gray-800"
            title="home"
          >
            <AiOutlineHome className="text-2xl text-main-text" />
            {isOpen && <span>Home</span>}
          </NavLink>

          <NavLink
            to="/about"
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
            activeClassName="bg-gray-800"
            title="about"
          >
            <AiOutlineInfoCircle className="text-2xl text-main-text" />
            {isOpen && <span>About</span>}
          </NavLink>

          <NavLink
            to="/playlists"
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
            activeClassName="bg-gray-800"
            title="playlists"
          >
            <AiOutlinePlayCircle className="text-2xl text-main-text" />
            {isOpen && <span>Playlists</span>}
          </NavLink>

          <NavLink
            to="/history"
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
            activeClassName="bg-gray-800"
            title="history"
          >
            <AiOutlinePlayCircle className="text-2xl text-main-text" />
            {isOpen && <span>History</span>}
          </NavLink>
        </nav>
      </div>

      {/* Logout Button (Fixed at the bottom) */}
      {isOpen && (
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold w-full"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
