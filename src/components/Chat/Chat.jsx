import classes from "./Chat.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { Sidebar } from "./Sidebar/Sidebar";
export const Chat = () => {
  return (
    <section className={classes.chat}>
      <Sidebar />
      <ChatContent />
    </section>
  );
};
