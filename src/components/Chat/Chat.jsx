import classes from "./Chat.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { Sidebar } from "./Sidebar/Sidebar";
import { useSocket } from "../../socket";

export const Chat = () => {
  useSocket();
  return (
    <section className={classes.chat}>
      <Sidebar />
      <ChatContent />
    </section>
  );
};
