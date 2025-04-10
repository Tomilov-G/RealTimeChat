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

export const CreateChat = () => {
  const dispatch = useDispatch();
  const chatDetails = useSelector((state) => state.chats.chatDetails);
  const selectedChatUsers = useSelector(
    (state) => state.users.selectedChatUsers
  );
  const currentUser = useSelector((state) => state.users.currentUser?.name);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !chatDetails.chatName.trim() ||
      !chatDetails.chatDescription.trim() ||
      selectedChatUsers.length <= 0
    ) {
      alert(
        "Пожалуйста, заполните все поля и выберите хотя бы одного пользователя."
      );
      return;
    }
    const newChatData = {
      ...chatDetails,
      users: selectedChatUsers,
      creatorOfChat: currentUser,
      id: new Date().toISOString(),
    };
    dispatch(setCreatedChat(newChatData));
    navigate("/chat");
    dispatch(resetChatDetails());
    dispatch(resetSelectedChatUsers());
  };

  return (
    <section className={classes.createChat}>
      <div className={classes.createChatInner}>
        <h1 className={classes.title}>Новый чат</h1>
        <form
          action=""
          className={classes.formWrapper}
          type="submit"
          onSubmit={handleSubmit}
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
