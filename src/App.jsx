import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './screens/Home';
import About from './screens/About';
import Error from './screens/Error';
import Login from './screens/Login';
import { refreshAccessToken } from './store/slices/authSlice';
import AuthWrapper from './components/AuthWrapper'; // New wrapper component for auth check

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        } // Wrapped with AuthWrapper
      />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<Error />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
