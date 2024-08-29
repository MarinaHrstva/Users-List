import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserConstructor } from "../utils";

type Address = {
  [key: string]: string;
  street: string;
  suite: string;
  city: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
};

type InitialState = {
  users: User[] | [];
  loading: boolean;
  error: string | undefined;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: undefined,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users?_start=0&_limit=10"
    );
    const data = response.data;
    return data;
  } catch (error) {
    new Error("Something went wrong!");
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        user
      );
      const data = response.data;
      return data;
    } catch (error) {
      new Error("Something went wrong!");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.map((element: User) => {
          const newUser = new UserConstructor(element);
          return newUser;
        });
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
