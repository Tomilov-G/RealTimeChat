import { useSelector, useDispatch } from "react-redux";
import classes from "./ChatsList.module.scss";
import { setSelectedChat } from "../../../../../store/Slices/chatsSlice";

// Component for displaying list of chats
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
    console.log("No currentUser, rendering loading...");
    return <p className={classes.text}>Loading user...</p>;
  }

  // Filter chats to show only those where the current user is a participant
  const availableChats = createdChats.filter((chat) =>
    chat.users.some((user) => user.id === currentUser.email)
  );
  console.log(
    "availableChats for user",
    currentUser.email,
    ":",
    availableChats
  );

  return (
    <>
      {availableChats.length !== 0 ? (
        <>
          <p className={classes.text}>Chats</p>
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
        <p className={classes.noChats}>No available chats</p>
      )}
    </>
  );
};
