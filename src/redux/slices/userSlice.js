import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const signup = createAsyncThunk(
  "/user/signup",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/register", info);
      return res.data;
    } catch (error) {
      // console.log("error,slice :",error)
      return rejectWithValue(
        error.response.data.msg || error.response.data.errors
      );
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", info);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg || error.response.data.errors
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    // isAuth: false || Boolean(localStorage.getItem("isAuth")),
    // token: null || localStorage.getItem("token"),
    //  userList: [],

    isAuth: localStorage.getItem("isAuth") === "true",
    token: localStorage.getItem("token") || null,
    errors: null,
    userList: JSON.parse(localStorage.getItem("userList")) || {},
  },

  reducers: {
    log_out: (state) => {
      state.isAuth = false;
      state.token = null;
      state.errors = null;
      state.userList = [];
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userList");
    },
  },

  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },

    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.errors = null;
      state.token = action.payload.token;
      state.userList = action.payload.user;

      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", state.token);
      localStorage.setItem("userList", JSON.stringify(state.userList));
    },

    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
      state.errors = action.payload;
      console.log("error on slice :", action.payload);
    },

    [signin.pending]: (state) => {
      state.isLoading = true;
    },

    [signin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.token = action.payload.token;
      state.errors = null;
      state.userList = action.payload.user;
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", state.token);
      localStorage.setItem("userList", JSON.stringify(state.userList));
      // console.log("sign in fullfilled :", state.userList);
    },

    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
      state.errors = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { log_out } = userSlice.actions;
