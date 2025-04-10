import { useSelector, useDispatch } from "react-redux";
import classes from "./ChatsList.module.scss";
import { setSelectedChat } from "../../../../../store/Slices/chatsSlice";

export const ChatsList = () => {
  const createdChats = useSelector((state) => state.chats.createdChats);
  const dispatch = useDispatch();
  return (
    <>
      {createdChats.length !== 0 ? (
        <ul className={classes.chatsList}>
          {createdChats.map((chat) => (
            <li
              className={classes.chatsItem}
              key={chat.id}
              onClick={() => dispatch(setSelectedChat(chat))}
            >
              {chat.chatName}
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes.text}>Нет доступных чатов</p>
      )}
    </>
  );
};
