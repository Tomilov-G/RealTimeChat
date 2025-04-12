import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/usersThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedChatUsers: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Set the current user
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    // Toggle user selection for chat creation
    toggleSelectedUser(state, action) {
      const userIndex = state.selectedChatUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex === -1) {
        state.selectedChatUsers.push(action.payload);
      } else {
        state.selectedChatUsers.splice(userIndex, 1);
      }
    },
    // Reset selected users for chat
    resetSelectedChatUsers(state) {
      state.selectedChatUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      // Handle successful fetch of users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // Handle failed fetch of users
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser, toggleSelectedUser, resetSelectedChatUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
