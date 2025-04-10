import classes from "./Sidebar.module.scss";
import SearchChatInput from "../../../ui/Inputs/SearchChatInput/SearchChatInput";
import { Logo } from "./Logo/Logo";
import { UserInfo } from "./UserInfo/UserInfo";
import { IconsBlock } from "./IconsBlock/IconsBlock";
import { ChatsBlock } from "./ChatsBlock/ChatsBlock";

export const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.topSection}>
        <div className={classes.firstColumn}>
          <Logo />
          <UserInfo />
        </div>
        <IconsBlock />
      </div>
      <SearchChatInput />
      <ChatsBlock />
    </aside>
  );
};
