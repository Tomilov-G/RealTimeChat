import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChatInfo.module.scss";
import { ChatModalWindow } from "../../../../ui/ModalWindows/ChatModalWindow/ChatModalWindow";
import { removeUserFromChat } from "../../../../store/Slices/chatsSlice";

export const ChatInfo = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteUser = (userId) => {
    if (selectedChat) {
      dispatch(removeUserFromChat(userId));
    }
  };

  return (
    <div className={classes.chatInfo}>
      <h2 className={classes.chatName} onClick={toggleModal}>
        {selectedChat.chatName}
      </h2>

      {isModalOpen && (
        <ChatModalWindow
          chatDescription={selectedChat.chatDescription}
          chatCreator={selectedChat.creatorOfChat}
          chatUsers={selectedChat.users.map((user, index) => (
            <li className={classes.chatUser} key={index}>
              {user.name}
              <FontAwesomeIcon
                icon={faTrash}
                className={classes.deleteIcon}
                onClick={() => handleDeleteUser(user.id)}
              />
            </li>
          ))}
        />
      )}
    </div>
  );
};
