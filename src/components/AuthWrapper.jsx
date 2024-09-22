import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../store/slices/authSlice';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (!storedAccessToken && !storedRefreshToken) {
      // If no tokens, navigate to login
      navigate('/login');
    } else if (storedRefreshToken && !storedAccessToken) {
      // If there's a refresh token but no access token, refresh tokens
      dispatch(refreshAccessToken({ refreshToken: storedRefreshToken }))
        .unwrap()
        .then(() => {
          // After refreshing tokens, navigate to home
          navigate('/');
        })
        .catch(() => {
          // If refreshing tokens fails, navigate to login
          navigate('/login');
        });
    }
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthWrapper;
