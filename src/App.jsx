import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Error from './screens/Error';
import Login from './screens/Login';
import { useDispatch } from 'react-redux';
import { refreshAccessToken } from './store/slices/authSlice';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          await dispatch(refreshAccessToken(refreshToken)).unwrap();
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkTokens();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
      <BrowserRouter>
        {isAuthenticated ? (
          <>
            <Navbar />
            <div className='flex-grow'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Error />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
