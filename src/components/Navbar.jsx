import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlinePlayCircle,
  AiOutlineHistory,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai'; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white ${
        isOpen ? 'w-[15rem]' : 'w-[4rem]'
      } transition-all duration-300`}>
      {/* Toggle Button */}
      <button onClick={toggleNavbar} className='p-3'>
        {isOpen ? (
          <AiOutlineClose className='text-2xl' />
        ) : (
          <AiOutlineMenu className='text-2xl' />
        )}
      </button>

      {/* Logo Section */}
      <div
        className={`flex items-center ${
          isOpen ? 'justify-start space-x-2' : 'justify-center'
        } p-4 text-xl font-bold`}>
        {isOpen && <span>MyApp</span>}
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-col space-y-4 p-4'>
        <NavLink
          to='/'
          className='flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md'
          activeClassName='bg-gray-800'>
          <AiOutlineHome className='text-2xl' />
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink
          to='/playlists'
          className='flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md'
          activeClassName='bg-gray-800'>
          <AiOutlinePlayCircle className='text-2xl' />
          {isOpen && <span>Playlists</span>}
        </NavLink>

        <NavLink
          to='/history'
          className='flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md'
          activeClassName='bg-gray-800'>
          <AiOutlineHistory className='text-2xl' />
          {isOpen && <span>History</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
