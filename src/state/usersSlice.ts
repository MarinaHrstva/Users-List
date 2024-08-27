import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserConstructor } from "../utils";

type Address = {
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
  error: string | null;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: null,
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
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
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default usersSlice.reducer;
