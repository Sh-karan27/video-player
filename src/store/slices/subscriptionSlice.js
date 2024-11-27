import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axiosInstance';

const initialState = {
  loading: null,
  error: null,
  subscriber: [],
  subscribedTo: [],
};

export const userSubscribers = createAsyncThunk(
  'userSubscribers/subscriber',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/subscriptions/c/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersSubscribedTo = createAsyncThunk(
  'usersSubscribedTo/subscriber',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/subscriptions/u/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(userSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriber = action.payload; // Correct case for success
        state.error = null;
      })
      .addCase(usersSubscribedTo.pending, (state) => {
        state.loading = true;
        state.error = null; // Set error to null when starting new request
      })
      .addCase(usersSubscribedTo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(usersSubscribedTo.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedTo = action.payload;
        state.error = null;
      });
  },
});

export default subscriptionSlice.reducer;
