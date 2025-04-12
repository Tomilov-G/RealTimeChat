import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./CreateChat.module.scss";
import { CreateChatDescription } from "./CreateChatDescription/CreateChatDescription";
import { CreateChatName } from "./CreateChatName/CreateChatName";
import {
  resetChatDetails,
  setCreatedChat,
} from "../../../store/Slices/chatsSlice";
import { AddChatUsers } from "./AddChatUsers/AddChatUsers";
import { FormButton } from "../../../ui/Buttons/FormButton/FormButton";
import { resetSelectedChatUsers } from "../../../store/Slices/usersSlice";
import { socket } from "../../../socket";

// Component for creating a new chat
export const CreateChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatDetails = useSelector((state) => state.chats.chatDetails);
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedChatUsers = useSelector(
    (state) => state.users.selectedChatUsers
  );

  // Handle chat creation
  const handleCreateChat = () => {
    if (!currentUser?.email || !currentUser?.name) {
      alert("Error: user not authenticated");
      return;
    }

    // Normalize selected users to include only id and name
    const normalizedUsers = selectedChatUsers
      .filter((user) => user.id !== currentUser.email) // Exclude current user to avoid duplication
      .map((user) => ({ id: user.email, name: user.name }));

    // Always include current user
    const usersWithCurrent = [
      { id: currentUser.email, name: currentUser.name },
      ...normalizedUsers,
    ];

    const chatData = {
      chatName: chatDetails.chatName,
      chatDescription: chatDetails.chatDescription,
      creatorOfChat: currentUser.name,
      id: new Date().toISOString(),
      users: usersWithCurrent,
    };

    console.log("Creating chat:", chatData);
    socket.emit("newChat", chatData);
    dispatch(setCreatedChat(chatData));
    dispatch(resetSelectedChatUsers());
    dispatch(resetChatDetails());

    navigate("/chat");
  };

  return (
    <section className={classes.createChat}>
      <div className={classes.createChatInner}>
        <h1 className={classes.title}>New Chat</h1>
        <form
          className={classes.formWrapper}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateChat();
          }}
        >
          <CreateChatName />
          <CreateChatDescription />
          <AddChatUsers />
          <FormButton
            buttonText="Create Chat"
            type="submit"
            className={classes.button}
          />
        </form>
      </div>
    </section>
  );
};

export default CreateChat;
