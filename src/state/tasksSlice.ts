import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Task = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

type InitialState = {
  loading: boolean;
  error: string | undefined;
  tasks: [] | Task[];
};

const initialState: InitialState = {
  loading: false,
  error: undefined,
  tasks: [],
};

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const data = response.data;
    return data;
  } catch (error) {
    new Error("Something went wrong!");
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask: (state, action) => {
      const { id, userId, title, completed } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);

      if (existingTask) {
        existingTask.userId = userId;
        existingTask.title = title;
        existingTask.completed = completed;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
