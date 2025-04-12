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

export const CreateChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatDetails = useSelector((state) => state.chats.chatDetails);
  const currentUser = useSelector((state) => state.users.currentUser);
  const selectedChatUsers = useSelector(
    (state) => state.users.selectedChatUsers
  );

  const handleCreateChat = () => {
    if (!currentUser?.email || !currentUser?.name) {
      alert("Ошибка: пользователь не авторизован");
      return;
    }

    const usersWithCurrent = selectedChatUsers.some(
      (user) => user.id === currentUser.email // Проверяем по email
    )
      ? [...selectedChatUsers]
      : [
          { id: currentUser.email, name: currentUser.name }, // Используем email
          ...selectedChatUsers,
        ];

    const chatData = {
      chatName: chatDetails.chatName,
      chatDescription: chatDetails.chatDescription,
      creatorOfChat: currentUser.name,
      id: new Date().toISOString(),
      users: usersWithCurrent,
    };

    console.log("Создаём чат:", chatData);
    socket.emit("newChat", chatData);
    dispatch(setCreatedChat(chatData));
    dispatch(resetSelectedChatUsers());
    dispatch(resetChatDetails());

    navigate("/chat");
  };

  return (
    <section className={classes.createChat}>
      <div className={classes.createChatInner}>
        <h1 className={classes.title}>Новый чат</h1>
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
            buttonText="Создать чат"
            type="submit"
            className={classes.button}
          />
        </form>
      </div>
    </section>
  );
};

export default CreateChat;
