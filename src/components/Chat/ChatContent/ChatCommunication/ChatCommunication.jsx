import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../socket";
import { addMessageToChat } from "../../../../store/Slices/chatsSlice";
import classes from "./ChatCommunication.module.scss";

export const ChatCommunication = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chats.selectedChat);
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    // Join the selected chat
    if (chatMessages?.id) {
      socket.emit("joinChat", chatMessages.id);
    }

    // Handle incoming messages
    socket.on("receiveMessage", (message) => {
      dispatch(addMessageToChat(message));
    });

    // Cleanup socket listener
    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch, chatMessages?.id]);

  return (
    <div className={classes.chatCommunication}>
      {chatMessages?.messages?.length > 0 ? (
        chatMessages.messages.map((message) => {
          const isCurrentUser = message.senderName === currentUser?.name;
          return (
            <div
              key={message.id}
              className={`${classes.message} ${
                isCurrentUser ? classes.ownMessage : classes.otherMessage
              }`}
            >
              <span className={classes.sender}>{message.senderName}</span>
              <p className={classes.messageText}>{message.text}</p>
              <span className={classes.time}>{message.timestamp}</span>
            </div>
          );
        })
      ) : (
        <p className={classes.noMessage}>No messages in the chat yet</p>
      )}
    </div>
  );
};
