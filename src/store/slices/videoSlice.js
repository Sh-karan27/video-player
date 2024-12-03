import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";

const intialState = {
  loading: null,
  error: null,
  data: [],
};

export const getAllUserVideo = createAsyncThunk(
  "video/allUserVideo",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/videos/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserVideo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllUserVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUserVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getAllUserVideo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllUserVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUserVideo.fulfilled, (state) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      });
  },
});

export default videoSlice.reducer;
