import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserTasks = createAsyncThunk(
  "/task/getUserTasks",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token slice :", token);

      const res = await axios.get("/task/getTasks", {
        headers: { token },
      });
      console.log("data slice :", res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg || error.response.data.errors
      );
    }
  }
);

export const deleteT = createAsyncThunk(
  "/task/deleteT",
  async (personelid, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/task/deleteTask/${personelid}`, {
        headers: { token: localStorage.getItem("token") },
      });
      dispatch(getUserTasks());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const createTask = createAsyncThunk(
  "/task/createTask",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("/task/newTask", info, {
        headers: { token: localStorage.getItem("token") },
      });
      dispatch(getUserTasks());
      console.log("slice :", res);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.msg || error.response.data.errors
      );
    }
  }
);

export const updateT = createAsyncThunk(
  "/task/updateT",
  async (task, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/task/updateTask/${task._id}`, task, {
        headers: { token: localStorage.getItem("token") },
      });
      dispatch(getUserTasks());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    taskList: [],
    errors: null,
  },

  extraReducers: {
    [getUserTasks.pending]: (state) => {
      state.isLoading = true;
    },

    [getUserTasks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.errors = null;
      state.taskList = action.payload.tasks;
      console.log("get tasks fullfilled:", state.taskList);
    },

    [getUserTasks.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
      console.log("get tasks rejected:", state.errors);
    },

    [deleteT.pending]: (state) => {
      state.isLoading = true;
    },

    [deleteT.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.taskList = action.payload.task;
    },

    [deleteT.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
      state.errors = action.error;
    },

    [createTask.pending]: (state) => {
      state.isLoading = true;
    },

    [createTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.taskList = action.payload.task;
      console.log("taskList :", action.payload.task);
    },

    [createTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
      state.errors = action.error;
      state.errors = action.payload;

      console.log("error add task :", state.errors);
    },

    [updateT.pending]: (state) => {
      state.isLoading = true;
    },
    [updateT.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.taskList = action.payload.task;
    },
    [updateT.rejected]: (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAuth = false;
      state.errors = action.error;
    },
  },
});
export default taskSlice.reducer;
