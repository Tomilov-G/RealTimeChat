import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  },
});

const chats = {}; // Store for chats
const userSockets = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    userSockets[userId] = socket.id;
    socket.join(`user:${userId}`);
    console.log(`User ${userId} registered with socket.id: ${socket.id}`);
  });

  socket.on("newChat", (chatData) => {
    console.log("Received new chat:", chatData);
    chats[chatData.id] = chatData;
    io.emit("chatCreated", chatData);
  });

  socket.on("removeUserFromChat", ({ chatId, userId, creatorId }) => {
    console.log(
      `Request to remove: chatId=${chatId}, userId=${userId}, creatorId=${creatorId}`
    );

    const chat = chats[chatId];
    if (!chat) {
      console.error(`Chat ${chatId} not found`);
      socket.emit("error", { message: "Chat not found" });
      return;
    }

    if (chat.creatorOfChat !== creatorId) {
      console.error(`User ${creatorId} is not the creator of chat ${chatId}`);
      socket.emit("error", {
        message: "Only the creator can remove users",
      });
      return;
    }

    // Remove user from chat
    chat.users = chat.users.filter((user) => user.id !== userId);
    chats[chatId] = chat;

    // Notify all chat participants of the update
    io.to(chatId).emit("userRemoved", { chatId, userId, updatedChat: chat });
    console.log(`Sent "userRemoved" to chat ${chatId} with updated chat`);

    // Notify the removed user
    const removedUserSocketId = userSockets[userId];
    if (removedUserSocketId) {
      io.to(removedUserSocketId).emit("kickedFromChat", { chatId });
      console.log(
        `Sent "kickedFromChat" to user ${userId} on socket ${removedUserSocketId}`
      );
    } else {
      console.warn(`Socket for user ${userId} not found`);
    }
  });

  // Retrieve all created chats
  socket.on("getAllChats", () => {
    const allChats = Object.values(chats);
    socket.emit("allChats", allChats);
    console.log(`Sent list of all chats to user ${socket.id}`);
  });

  // Join selected chats
  socket.on("joinChats", ({ chatIds, user }) => {
    if (!chatIds || !Array.isArray(chatIds) || !user || !user.id) {
      socket.emit("error", {
        message: "Invalid data for joining chats",
      });
      console.error("Invalid data for joinChats:", { chatIds, user });
      return;
    }

    const updatedChats = [];
    chatIds.forEach((chatId) => {
      const chat = chats[chatId];
      if (chat) {
        // Check if the user is already in the chat
        if (!chat.users.some((u) => u.id === user.id)) {
          chat.users.push({ id: user.id, name: user.name });
          chats[chatId] = chat;
          socket.join(chatId); // Add user to chat room
          updatedChats.push(chat);
          // Notify all chat participants of the new user
          io.to(chatId).emit("userJoined", { chatId, user });
          console.log(`User ${user.id} joined chat ${chatId}`);
        }
      } else {
        console.warn(`Chat ${chatId} not found`);
      }
    });

    // Send updated chats to the user
    socket.emit("joinedChats", updatedChats);
    console.log(`Sent updated chats to user ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [userId, socketId] of Object.entries(userSockets)) {
      if (socketId === socket.id) {
        delete userSockets[userId];
        break;
      }
    }
  });

  socket.on("sendMessage", (data) => {
    if (!data || !data.chatId || !data.message) {
      console.error("Invalid data for sendMessage:", data);
      socket.emit("error", { message: "Invalid message data" });
      return;
    }
    const { chatId, message } = data;
    console.log(`Message for chat ${chatId}:`, message);
    io.to(chatId).emit("receiveMessage", message);
  });

  socket.on("joinChat", (chatId) => {
    if (!chatId) {
      console.error("chatId not provided for joinChat");
      socket.emit("error", { message: "chatId not provided" });
      return;
    }
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server started on port 3001");
});
