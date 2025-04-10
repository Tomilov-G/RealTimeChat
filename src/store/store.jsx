import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/usersSlice";
import chatsReducer from "./Slices/chatsSlice";
import { loadState, subscribeToStore } from "../localStorage/localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    users: usersReducer,
    chats: chatsReducer,
  },
  preloadedState,
});

subscribeToStore(store);

export default store;
