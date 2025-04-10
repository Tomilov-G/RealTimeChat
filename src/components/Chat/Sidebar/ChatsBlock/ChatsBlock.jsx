import classes from "./ChatsBlock.module.scss";
import { ChatsList } from "./ChatsList/ChatsList";
export const ChatsBlock = () => {
  return (
    <div className={classes.chatsSection}>
      <ChatsList />
    </div>
  );
};
