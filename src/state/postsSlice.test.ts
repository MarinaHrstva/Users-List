import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import postsReducer, {
  getUserPosts,
  updatePost,
  deletePost,
  Post,
  InitialState,
} from "./postsSlice";

const mock = new MockAdapter(axios);

const initialState = {
  selectedUserPosts: [],
  loading: false,
  error: undefined,
};

describe("postsSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: postsReducer,
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test("should handle initial state", () => {
    const state = store.getState() as InitialState;
    expect(state.selectedUserPosts).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  test("should handle getUserPosts.pending", () => {
    const action = getUserPosts.pending("requestId", "");
    const nextState = postsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
  });

  test("should handle getUserPosts.fulfilled", async () => {
    const mockPosts: Post[] = [
      { userId: "1", id: "1", title: "Post 1", body: "Body 1" },
      { userId: "1", id: "2", title: "Post 2", body: "Body 2" },
    ];

    mock
      .onGet("https://jsonplaceholder.typicode.com/posts?userId=1")
      .reply(200, mockPosts);

    await store.dispatch(getUserPosts("1") as any);

    const state = store.getState() as InitialState;
    expect(state.selectedUserPosts).toEqual(mockPosts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  test("should handle getUserPosts.rejected", async () => {
    mock
      .onGet("https://jsonplaceholder.typicode.com/posts?userId=1")
      .reply(500);

    await store.dispatch(getUserPosts("1") as any);

    const state = store.getState() as InitialState;
    expect(state.loading).toBe(false);
    expect(state.error).toBeDefined();
  });

  test("should handle updatePost.fulfilled", async () => {
    const initialPosts: Post[] = [
      { userId: "1", id: "1", title: "Old Post", body: "Old Body" },
    ];
    const updatedPost: Post = {
      userId: "1",
      id: "1",
      title: "Updated Post",
      body: "Updated Body",
    };

    mock
      .onGet("https://jsonplaceholder.typicode.com/posts?userId=1")
      .reply(200, initialPosts);
    mock
      .onPut(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`)
      .reply(200, updatedPost);

    await store.dispatch(getUserPosts("1") as any);
    await store.dispatch(updatePost(updatedPost) as any);

    const state = store.getState() as InitialState;

    expect(
      state.selectedUserPosts.find((post) => post.id === updatedPost.id)
    ).toEqual(updatedPost);
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  test("should handle deletePost.fulfilled", async () => {
    const initialPosts: Post[] = [
      { userId: "1", id: "1", title: "Post 1", body: "Body 1" },
      { userId: "1", id: "2", title: "Post 2", body: "Body 2" },
    ];
    const postIdToDelete = "1";

    mock
      .onGet("https://jsonplaceholder.typicode.com/posts?userId=1")
      .reply(200, initialPosts);
    mock
      .onDelete(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`)
      .reply(200);

    await store.dispatch(getUserPosts("1") as any);
    let state = store.getState() as InitialState;
    expect(state.selectedUserPosts).toEqual(initialPosts);

    await store.dispatch(deletePost(postIdToDelete)as any);
    state = store.getState() as InitialState;

    expect(
      state.selectedUserPosts.find((post) => post.id === postIdToDelete)
    ).toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.error).toBeUndefined();
  });
});
