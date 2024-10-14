import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axiosInstance';
import { toast } from 'react-toastify';

const initialState = {
  loading: null,
  error: null,
  data: null,
};

export const getCurrentUser = createAsyncThunk(
  '/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/current-user');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserChannelProfile = createAsyncThunk(
  '/getUserChannelProfile',
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/c/${username}`);
      console.log(response.data.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  '/user/updateCoverImage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        '/users/update-cover-image',
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'users/update-avatar',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        '/users/update-avatar',
        formData
      );

      console.log(object);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getUserChannelProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateCoverImage.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(updateCoverImage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        toast.success('cover-image updated!');
        state.error = null;
      })
      .addCase(updateCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error('Failed to update cover-image');
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        toast.success('Profile updated!');
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
