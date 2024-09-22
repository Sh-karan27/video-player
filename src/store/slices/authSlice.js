import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axiosInstance/index';

const initialState = {
  loading: null,
  error: null,
  user: null,
  userId: null,
  refreshToken: null,
  accessToken: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { accessToken, user } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      console.log(user, accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Fix: correct error access and return
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/users/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  '/users/refreshAccessToken',

  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/refresh-token', {
        refreshToken,
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userId = action.payload._id;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshToken = null;
        state.accessToken = null;
        state.userId = null;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
