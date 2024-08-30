import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

export type InitialState = {
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

export const updatePost = createAsyncThunk(
  "users/updatePost",
  async (post: Post) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
      const data = response.data;
      return data;
    } catch (error) {
      new Error("Something went wrong!");
    }
  }
);

export const deletePost = createAsyncThunk(
  "users/deletePost",
  async (id: string) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (response.status === 200) {
        return id;
      }
    } catch (error) {
      new Error("Something went wrong!");
    }
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
        state.loading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.selectedUserPosts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.selectedUserPosts[index] = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUserPosts = state.selectedUserPosts.filter(
          (post) => post.id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
