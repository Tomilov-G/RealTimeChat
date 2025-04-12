import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatDetails: {
    chatName: "",
    chatDescription: "",
    creatorOfChat: "",
    id: "",
  },
  createdChats: [], // Чаты, в которых участвует пользователь
  selectedChat: null, // Текущий выбранный чат
  allChats: [], // Все созданные чаты (независимо от участия)
  selectedJoinChats: [], // Чаты, выбранные для присоединения
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatDetails(state, action) {
      state.chatDetails = { ...state.chatDetails, ...action.payload };
    },
    setCreatedChat(state, action) {
      if (!Array.isArray(state.allChats)) state.allChats = [];
      const chat = action.payload;
      console.log("Добавляем чат в createdChats:", chat);
      // Проверяем, не существует ли чат уже в allChats
      if (!state.allChats.some((c) => c.id === chat.id)) {
        state.allChats.push(chat);
      }
      if (!Array.isArray(state.createdChats)) state.createdChats = [];
      // Проверяем, не существует ли чат уже в createdChats
      if (!state.createdChats.some((c) => c.id === chat.id)) {
        state.createdChats.push(chat);
      } else {
        console.log("Чат уже существует в createdChats:", chat.id);
      }
    },
    resetChatDetails(state) {
      state.chatDetails = { ...initialState.chatDetails };
    },
    setSelectedChat(state, action) {
      const selected = action.payload;
      state.selectedChat = {
        ...selected,
        messages: selected.messages || [],
      };
    },
    removeUserFromChat(state, action) {
      if (state.selectedChat) {
        state.selectedChat.users = state.selectedChat.users.filter(
          (user) => user.id !== action.payload
        );
      }
    },
    removeChat(state, action) {
      const chatId = action.payload;
      state.createdChats = state.createdChats.filter(
        (chat) => chat.id !== chatId
      );
      if (state.selectedChat?.id === chatId) {
        state.selectedChat = null;
      }
    },
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
    setAllChats(state, action) {
      state.allChats = action.payload;
    },
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
