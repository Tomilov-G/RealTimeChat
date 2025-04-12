import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreatedChat,
  removeChat,
  updateChat,
  setAllChats,
  addMessageToChat, // Импортируем, так как он упомянут
} from "./store/Slices/chatsSlice";

export const socket = io("http://localhost:3001");

export const useSocket = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with id: " + socket.id);
    });

    if (currentUser?.email) {
      socket.emit("register", currentUser.email); // Используем email для регистрации
    }

    // Обработка создания нового чата
    socket.on("chatCreated", (chatData) => {
      console.log("Получен новый чат:", chatData);
      // Добавляем чат в createdChats только если пользователь в нём участвует
      if (
        chatData.users.some((user) => user.id === currentUser?.email) ||
        chatData.creatorOfChat === currentUser?.name
      ) {
        dispatch(setCreatedChat(chatData));
      }
      // Обновляем allChats для всех пользователей
      dispatch(
        setAllChats([...useSelector((state) => state.chats.allChats), chatData])
      );
    });

    // Обработка удаления пользователя из чата
    socket.on("userRemoved", ({ chatId, userId, updatedChat }) => {
      console.log("Пользователь удалён из чата:", updatedChat);
      dispatch(updateChat(updatedChat));
    });

    // Обработка исключения пользователя из чата
    socket.on("kickedFromChat", ({ chatId }) => {
      console.log("Пользователь исключён из чата:", chatId);
      dispatch(removeChat(chatId));
    });

    // Обработка входящих сообщений
    socket.on("receiveMessage", (messageData) => {
      console.log("Получено сообщение:", messageData);
      dispatch(addMessageToChat(messageData));
    });

    // Обработка получения всех чатов
    socket.on("allChats", (chats) => {
      console.log("Получены все чаты:", chats);
      dispatch(setAllChats(chats));
    });

    // Обработка присоединения к чатам
    socket.on("joinedChats", (updatedChats) => {
      console.log("Присоединились к чатам:", updatedChats);
      updatedChats.forEach((chat) => {
        dispatch(updateChat(chat));
      });
    });

    // Обработка нового пользователя в чате
    socket.on("userJoined", ({ chatId, updatedChat }) => {
      console.log("Новый пользователь в чате:", updatedChat);
      dispatch(updateChat(updatedChat));
    });

    // Обработка ошибок сервера
    socket.on("error", (error) => {
      console.error("Ошибка сервера:", error.message);
      alert(error.message);
    });

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
  }, [dispatch, currentUser]);

  return socket;
};
