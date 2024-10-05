import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
      }
      window.location.reload();
    });
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(user);
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
