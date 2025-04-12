import { useState } from "react";
import { useSelector } from "react-redux";
import {
  faPaperPlane,
  faSmile,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./WriteMessage.module.scss";
import { MessageButton } from "../../../../ui/Buttons/MessageButton/MessageButton";
import { socket } from "../../../../socket";

export const WriteMessage = () => {
  const [textMessage, setTextMessage] = useState("");
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  // Format timestamp for messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle sending a message
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (textMessage.trim() && currentUser && selectedChat) {
      const newMessage = {
        text: textMessage,
        senderName: currentUser.name,
        timestamp: formatTime(new Date().getTime()),
        id: Date.now(), // Unique ID for the message
      };
      socket.emit("sendMessage", {
        chatId: selectedChat.id,
        message: newMessage,
      });
      setTextMessage("");
    }
  };

  return (
    <div className={classes.writeMessage}>
      <form className={classes.formWrapper} onSubmit={handleSendMessage}>
        <input
          value={textMessage}
          type="text"
          placeholder="Message"
          className={classes.input}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <MessageButton icon={faFileImage} />
        <MessageButton icon={faSmile} />
        <MessageButton icon={faPaperPlane} type="submit" />
      </form>
    </div>
  );
};
