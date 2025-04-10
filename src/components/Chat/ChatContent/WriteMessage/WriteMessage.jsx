import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faPaperPlane,
  faSmile,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./WriteMessage.module.scss";
import { MessageButton } from "../../../../ui/Buttons/MessageButton/MessageButton";
import { addMessageToChat } from "../../../../store/Slices/chatsSlice";

export const WriteMessage = () => {
  const [textMessage, setTextMessage] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (textMessage.trim() && currentUser && selectedChat) {
      const newMessage = {
        text: textMessage,
        senderName: currentUser.name,
        timestamp: formatTime(new Date().getTime()),
      };

      dispatch(addMessageToChat(newMessage));
      setTextMessage("");
    }
  };

  const handleChange = (event) => {
    setTextMessage(event.target.value);
  };

  return (
    <div className={classes.writeMessage}>
      <form
        action=""
        className={classes.formWrapper}
        onSubmit={handleSendMessage}
      >
        <input
          value={textMessage}
          type="text"
          placeholder="Написать сообщение"
          className={classes.input}
          onChange={handleChange}
        />
        <MessageButton icon={faFileImage} type="submit" />
        <MessageButton icon={faSmile} type="submit" />
        <MessageButton icon={faPaperPlane} type="submit" />
      </form>
    </div>
  );
};
