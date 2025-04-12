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
    if (chatMessages?.id) {
      socket.emit("joinChat", chatMessages.id);
    }

    socket.on("receiveMessage", (message) => {
      dispatch(addMessageToChat(message));
    });

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
        <p className={classes.noMessage}>В чате пока нет сообщений</p>
      )}
    </div>
  );
};
