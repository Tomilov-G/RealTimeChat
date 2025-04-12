import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreatedChat,
  removeChat,
  updateChat,
  setAllChats,
  addMessageToChat,
} from "./store/Slices/chatsSlice";

export const socket = io("http://localhost:3001");

// Custom hook to manage socket.io connections and events
export const useSocket = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const allChats = useSelector((state) => state.chats.allChats);

  useEffect(() => {
    // Handle successful connection to the server
    socket.on("connect", () => {
      console.log("Connected to server with id: " + socket.id);
    });

    // Register current user with their email when available
    if (currentUser?.email) {
      socket.emit("register", currentUser.email);
      console.log("Registered user:", currentUser.email);
    }

    // Handle new chat creation
    socket.on("chatCreated", (chatData) => {
      console.log(
        "Received chatCreated:",
        chatData,
        "Current user:",
        currentUser?.email
      );
      // If currentUser is not yet loaded, store chatData temporarily
      if (!currentUser?.email) {
        console.warn("currentUser not loaded yet, retrying chatCreated later");
        setTimeout(() => socket.emit("getAllChats"), 1000); // Retry after delay
        return;
      }
      // Add chat to createdChats if the current user is a participant or creator
      if (
        chatData.users.some((user) => user.id === currentUser.email) ||
        chatData.creatorOfChat === currentUser.name
      ) {
        console.log("Adding chat to createdChats for user:", currentUser.email);
        dispatch(setCreatedChat(chatData));
      } else {
        console.log(
          "User not in chat, skipping createdChats:",
          currentUser.email
        );
      }
      // Update allChats only if the chat doesn't already exist
      if (!allChats.some((chat) => chat.id === chatData.id)) {
        dispatch(setAllChats([...allChats, chatData]));
      }
    });

    // Handle user removal from chat
    socket.on("userRemoved", ({ chatId, userId, updatedChat }) => {
      console.log("User removed from chat:", updatedChat);
      dispatch(updateChat(updatedChat));
    });

    // Handle user being kicked from chat
    socket.on("kickedFromChat", ({ chatId }) => {
      console.log("User kicked from chat:", chatId);
      dispatch(removeChat(chatId));
    });

    // Handle incoming messages
    socket.on("receiveMessage", (messageData) => {
      console.log("Received message:", messageData);
      dispatch(addMessageToChat(messageData));
    });

    // Handle receiving all chats
    socket.on("allChats", (chats) => {
      console.log("Received all chats:", chats);
      dispatch(setAllChats(chats));
    });

    // Handle joining chats
    socket.on("joinedChats", (updatedChats) => {
      console.log("Successfully joined chats:", updatedChats);
      updatedChats.forEach((chat) => {
        dispatch(updateChat(chat));
      });
    });

    // Handle new user joining a chat
    socket.on("userJoined", ({ chatId, user }) => {
      console.log("New user joined chat:", user, "chatId:", chatId);
      dispatch(
        updateChat({
          id: chatId,
          users: [...allChats.find((c) => c.id === chatId)?.users, user],
        })
      );
    });

    // Handle server errors
    socket.on("error", (error) => {
      console.error("Server error:", error.message);
      alert(error.message);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("connect");
      socket.off("chatCreated");
      socket.off("userRemoved");
      socket.off("kickedFromChat");
      socket.off("receiveMessage");
      socket.off("allChats");
      socket.off("joinedChats");
      socket.off("userJoined");
      socket.off("error");
    };
  }, [dispatch, currentUser, allChats]);

  return socket;
};
