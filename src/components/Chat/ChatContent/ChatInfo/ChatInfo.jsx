import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChatInfo.module.scss";
import { ChatModalWindow } from "../../../../ui/ModalWindows/ChatModalWindow/ChatModalWindow";
import { socket } from "../../../../socket";

export const ChatInfo = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const currentUser = useSelector((state) => state.users.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Handle user removal from chat
  const handleDeleteUser = (userId) => {
    if (currentUser?.name === selectedChat?.creatorOfChat) {
      socket.emit("removeUserFromChat", {
        chatId: selectedChat.id,
        userId,
        creatorId: currentUser.name,
      });
    } else {
      alert("Only the chat creator can remove users!");
    }
  };

  return (
    <div className={classes.chatInfo}>
      <h2 className={classes.chatName} onClick={toggleModal}>
        {selectedChat?.chatName || "Select a chat"}
      </h2>

      {isModalOpen && selectedChat && (
        <ChatModalWindow
          chatDescription={selectedChat.chatDescription}
          chatCreator={selectedChat.creatorOfChat}
          chatUsers={selectedChat.users.slice(1).map((user) => (
            <li className={classes.chatUser} key={user.id}>
              {user.name}
              {currentUser?.name === selectedChat.creatorOfChat && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className={classes.deleteIcon}
                  onClick={() => handleDeleteUser(user.id)}
                />
              )}
            </li>
          ))}
        />
      )}
    </div>
  );
};
