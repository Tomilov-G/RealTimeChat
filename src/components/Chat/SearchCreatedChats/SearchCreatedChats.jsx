import { JoinToChats } from "./JoinToChats/JoinToChats";
import classes from "./SearchCreatedChats.module.scss";

export const SearchCreatedChats = () => {
  return (
    <section className={classes.searchCreatedChats}>
      <JoinToChats />
    </section>
  );
};
