import {
  createSlice,
  asyncThunkCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const intialState = {
  loading: null,
  error: null,
  data: [],
};

export const getAllUserVideo = createAsyncThunk(
  "video/allUserVideo",
  async ({ userId }, { rejectWithValue }) => {
    try {
    } catch (error) {}
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
      });
  },
});

export default videoSlice.reducer;
