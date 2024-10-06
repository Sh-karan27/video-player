import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Icons
import {
  MdDashboard,
  MdOutlinePlaylistAdd,
  MdHistoryToggleOff,
} from 'react-icons/md'; // Icons
import { FaVideo, FaUsers } from 'react-icons/fa'; // Icons for Videos and Subscribers
import { GrChannel } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { SlLike } from 'react-icons/sl';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
      }
      window.location.reload();
    });
  };

  return (
    <div
      className={`min-h-screen bg-background-secondary text-secondary-text flex flex-col justify-between ${
        isOpen ? 'w-[15rem]' : 'w-[4rem]'
      } transition-all duration-500 ease-in-out relative`}>
      {/* Top Section */}
      <div>
        {/* Toggle Button */}
        <button onClick={toggleNavbar} className='p-3'>
          {isOpen ? (
            <AiOutlineClose className='text-2xl transition-transform duration-500 ease-in-out transform rotate-180' />
          ) : (
            <AiOutlineMenu className='text-2xl transition-transform duration-500 ease-in-out transform rotate-0 text-main-text' />
          )}
        </button>

        {/* Logo Section */}
        <div
          className={`flex items-center ${
            isOpen ? 'justify-start space-x-2' : 'justify-center'
          } p-4 text-xl font-bold transition-all duration-500 ease-in-out`}>
          {isOpen && <span>Sh_player</span>}
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col space-y-4 p-4 overflow-hidden'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='home'>
            <AiOutlineHome
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Home</span>}
          </NavLink>

          <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='dashboard'>
            <MdDashboard
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to='/channel'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='channel'>
            <GrChannel
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Channel</span>}
          </NavLink>

          <NavLink
            to='/playlist'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='playlist'>
            <MdOutlinePlaylistAdd
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Playlist</span>}
          </NavLink>

          <NavLink
            to='/liked-video'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='liked videos'>
            <SlLike
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Liked Videos</span>}
          </NavLink>

          <NavLink
            to='/your-video'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='your videos'>
            <FaVideo
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Your Videos</span>}
          </NavLink>

          <NavLink
            to='/subscribers'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='subscribers'>
            <FaUsers
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>Subscribers</span>}
          </NavLink>

          <NavLink
            to='/history'
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-500 ease-in-out ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
            title='history'>
            <MdHistoryToggleOff
              className={`text-2xl text-main-text transition-transform duration-500 ease-in-out ${
                isOpen
                  ? 'transform translate-x-0'
                  : 'transform translate-x-[-50%]'
              }`}
            />
            {isOpen && <span>History</span>}
          </NavLink>
        </nav>
      </div>

      {/* Logout Button (Fixed at the bottom) */}
      {isOpen && (
        <div className='absolute bottom-4 left-0 right-0 p-4 transition-all duration-500 ease-in-out'>
          <button
            onClick={handleLogout}
            className='border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold w-full transition-colors duration-500 ease-in-out'>
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
