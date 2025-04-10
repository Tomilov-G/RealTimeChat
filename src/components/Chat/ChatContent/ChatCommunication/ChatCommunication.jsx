import { useSelector } from "react-redux";
import classes from "./ChatCommunication.module.scss";

export const ChatCommunication = () => {
  const chatMessages = useSelector((state) => state.chats.selectedChat);
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <div className={classes.chatCommunication}>
      {chatMessages?.messages?.length ? (
        <>
          {chatMessages.messages.map((message, index) => {
            const isCurrentUser = message.senderName === currentUser?.name;

            return (
              <div
                key={index}
                className={`${classes.message} ${
                  isCurrentUser ? classes.ownMessage : classes.otherMessage
                }`}
              >
                <span className={classes.sender}>{message.senderName}</span>
                <p className={classes.messageText}>{message.text}</p>
                <span className={classes.time}>{message.timestamp}</span>
              </div>
            );
          })}
        </>
      ) : (
        <p className={classes.noMessage}>В чате пока нет сообщений</p>
      )}
    </div>
  );
};
