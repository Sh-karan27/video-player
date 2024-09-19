import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default authSlice.reducer;
