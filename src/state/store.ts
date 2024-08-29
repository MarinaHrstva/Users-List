import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import postsSlice from "./postsSlice";
import tasksSlice from "./tasksSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
