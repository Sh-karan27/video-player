import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
