import { useSelector, useDispatch } from "react-redux";
import classes from "./ChatsList.module.scss";
import { setSelectedChat } from "../../../../../store/Slices/chatsSlice";

export const ChatsList = () => {
  const createdChats = useSelector((state) => state.chats.createdChats);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  console.log("createdChats:", createdChats);
  console.log("currentUser:", currentUser);
  console.log(
    "users in createdChats:",
    createdChats.map((chat) => ({
      chatId: chat.id,
      users: chat.users,
    }))
  );

  if (!currentUser) {
    return <p className={classes.text}>Загрузка пользователя...</p>;
  }

  const availableChats = createdChats.filter((chat) =>
    chat.users.some((user) => user.id === currentUser.email)
  );
  console.log("availableChats:", availableChats);

  return (
    <>
      {availableChats.length !== 0 ? (
        <>
          <p className={classes.text}>Чаты</p>
          <ul className={classes.chatsList}>
            {availableChats.map((chat) => (
              <li
                className={classes.chatsItem}
                key={chat.id}
                onClick={() => dispatch(setSelectedChat(chat))}
              >
                {chat.chatName}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={classes.noChats}>Нет доступных чатов</p>
      )}
    </>
  );
};
