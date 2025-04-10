import { useSelector } from "react-redux";
import classes from "./ChatContent.module.scss";
import { ChatInfo } from "./ChatInfo/ChatInfo";
import { WriteMessage } from "./WriteMessage/WriteMessage";
import { ChatCommunication } from "./ChatCommunication/ChatCommunication";

export const ChatContent = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  if (!selectedChat) {
    return (
      <div className={classes.noChatContent}>Создайте или выберете чат</div>
    );
  }
  return (
    <div className={classes.chatContent}>
      <ChatInfo />
      <ChatCommunication />
      <WriteMessage />
    </div>
  );
};
