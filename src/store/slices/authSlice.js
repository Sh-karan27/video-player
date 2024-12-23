import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance/index";
import { toast } from "react-toastify";

const initialState = {
  loading: null,
  error: null,
  user: null,
  userId: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, user } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      console.log(user, accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Fix: correct error access and return
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email);
    console.log(password);
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log(response.data.data);
      return { user, token: accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (oldRefreshToken, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", {
        refreshToken: oldRefreshToken,
      });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
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
        toast.error("failed to login");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userId = action.payload._id;
        state.token = action.payload.token;
        state.error = null;
        toast.success("Logged In");
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
      });
    // .addCase(refreshAccessToken.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(refreshAccessToken.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // .addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    //   state.error = null;
    // });
  },
});

export default authSlice.reducer;
