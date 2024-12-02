import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import videoReducer from "../store/slices/videoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    videos: videoReducer,
  },
});

export default store;
