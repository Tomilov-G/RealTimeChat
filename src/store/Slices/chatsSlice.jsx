import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatDetails: {
    chatName: "",
    chatDescription: "",
    creatorOfChat: "",
    id: "",
  },
  createdChats: [],
  selectedChat: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatDetails(state, action) {
      state.chatDetails = { ...state.chatDetails, ...action.payload };
    },
    setCreatedChat(state, action) {
      state.createdChats.push(action.payload);
    },
    resetChatDetails(state) {
      state.chatDetails = { ...initialState.chatDetails };
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    removeUserFromChat(state, action) {
      const userId = action.payload;
      if (state.selectedChat) {
        state.selectedChat.users = state.selectedChat.users.filter(
          (user) => user.id !== userId
        );
      }
    },
    addMessageToChat(state, action) {
      if (state.selectedChat) {
        if (!state.selectedChat.messages) {
          state.selectedChat.messages = [];
        }
        state.selectedChat.messages.push(action.payload);
        const chatIndex = state.createdChats.findIndex(
          (chat) => chat.id === state.selectedChat.id
        );
        if (chatIndex !== -1) {
          state.createdChats[chatIndex].messages = state.selectedChat.messages;
        }
      }
    },
  },
});

export const {
  setChatDetails,
  setCreatedChat,
  resetChatDetails,
  setSelectedChat,
  removeUserFromChat,
  addMessageToChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;
