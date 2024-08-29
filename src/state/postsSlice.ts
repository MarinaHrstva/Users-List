import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type InitialState = {
  selectedUserPosts: Post[] | [];
  loading: boolean;
  error: undefined | string;
};

const initialState: InitialState = {
  selectedUserPosts: [],
  loading: false,
  error: undefined,
};

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId: string) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const data = response.data;
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUserPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// export const {} = postsSlice.actions;

export default postsSlice.reducer;
