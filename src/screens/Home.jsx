import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';

const Home = () => {
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
    <div>
      Home
      <button
        onClick={handleLogout}
        className='border border-black hover:bg-black hover:text-white rounded-3xl px-5 py-1 font-semibold'>
        LogOut
      </button>
    </div>
  );
};

export default Home;
