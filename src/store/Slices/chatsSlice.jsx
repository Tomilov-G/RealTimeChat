import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatDetails: {
    chatName: "",
    chatDescription: "",
    creatorOfChat: "",
    id: "",
  },
  createdChats: [], // Chats the user participates in
  selectedChat: null, // Currently selected chat
  allChats: [], // All created chats
  selectedJoinChats: [], // Chats selected for joining
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    // Update chat details
    setChatDetails(state, action) {
      state.chatDetails = { ...state.chatDetails, ...action.payload };
    },
    // Add a new chat to createdChats and allChats
    setCreatedChat(state, action) {
      if (!Array.isArray(state.allChats)) state.allChats = [];
      const chat = action.payload;
      console.log("Adding chat to createdChats:", chat);
      // Add to allChats if not already present
      if (!state.allChats.some((c) => c.id === chat.id)) {
        state.allChats.push(chat);
      }
      if (!Array.isArray(state.createdChats)) state.createdChats = [];
      // Add to createdChats if not already present
      if (!state.createdChats.some((c) => c.id === chat.id)) {
        state.createdChats.push(chat);
      } else {
        console.log("Chat already exists in createdChats:", chat.id);
      }
    },
    // Reset chat details
    resetChatDetails(state) {
      state.chatDetails = { ...initialState.chatDetails };
    },
    // Set the selected chat
    setSelectedChat(state, action) {
      const selected = action.payload;
      state.selectedChat = {
        ...selected,
        messages: selected.messages || [],
      };
    },
    // Remove a user from the selected chat
    removeUserFromChat(state, action) {
      if (state.selectedChat) {
        state.selectedChat.users = state.selectedChat.users.filter(
          (user) => user.id !== action.payload
        );
      }
    },
    // Remove a chat from createdChats
    removeChat(state, action) {
      const chatId = action.payload;
      state.createdChats = state.createdChats.filter(
        (chat) => chat.id !== chatId
      );
      if (state.selectedChat?.id === chatId) {
        state.selectedChat = null;
      }
    },
    // Update chat in createdChats, allChats, and selectedChat
    updateChat(state, action) {
      const updatedChat = action.payload;
      const chatIndex = state.createdChats.findIndex(
        (chat) => chat.id === updatedChat.id
      );
      if (chatIndex !== -1) {
        state.createdChats[chatIndex] = {
          ...updatedChat,
          messages: state.createdChats[chatIndex].messages || [],
        };
      } else {
        state.createdChats.push({
          ...updatedChat,
          messages: updatedChat.messages || [],
        });
      }
      const allChatsIndex = state.allChats.findIndex(
        (chat) => chat.id === updatedChat.id
      );
      if (allChatsIndex !== -1) {
        state.allChats[allChatsIndex] = {
          ...updatedChat,
          messages: state.allChats[allChatsIndex].messages || [],
        };
      } else {
        state.allChats.push({
          ...updatedChat,
          messages: updatedChat.messages || [],
        });
      }
      if (state.selectedChat?.id === updatedChat.id) {
        state.selectedChat = {
          ...updatedChat,
          messages: state.selectedChat.messages || [],
        };
      }
    },
    // Add a message to the selected chat
    addMessageToChat(state, action) {
      const message = action.payload;
      if (state.selectedChat) {
        state.selectedChat = {
          ...state.selectedChat,
          messages: [...(state.selectedChat.messages || []), message],
        };

        const chatIndex = state.createdChats.findIndex(
          (chat) => chat.id === state.selectedChat.id
        );
        if (chatIndex !== -1) {
          state.createdChats[chatIndex] = {
            ...state.createdChats[chatIndex],
            messages: state.selectedChat.messages,
          };
        }

        const allChatsIndex = state.allChats.findIndex(
          (chat) => chat.id === state.selectedChat.id
        );
        if (allChatsIndex !== -1) {
          state.allChats[allChatsIndex] = {
            ...state.allChats[allChatsIndex],
            messages: state.selectedChat.messages,
          };
        }
      }
    },
    // Set all chats
    setAllChats(state, action) {
      state.allChats = action.payload;
    },
    // Toggle selection of chats to join
    toggleSelectedJoinChat(state, action) {
      const chatId = action.payload;
      if (state.selectedJoinChats.includes(chatId)) {
        state.selectedJoinChats = state.selectedJoinChats.filter(
          (id) => id !== chatId
        );
      } else {
        state.selectedJoinChats.push(chatId);
      }
    },
    // Reset selected chats for joining
    resetSelectedJoinChats(state) {
      state.selectedJoinChats = [];
    },
  },
});

export const {
  setChatDetails,
  setCreatedChat,
  resetChatDetails,
  setSelectedChat,
  removeUserFromChat,
  removeChat,
  updateChat,
  addMessageToChat,
  setAllChats,
  toggleSelectedJoinChat,
  resetSelectedJoinChats,
} = chatsSlice.actions;

export default chatsSlice.reducer;
