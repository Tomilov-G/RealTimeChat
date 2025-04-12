import { SearchUserInput } from "../../../../../../ui/Inputs/SearchUserInput/SearchUserInput";
import classes from "./SelectChatUsersListItem.module.scss";

export const SelectChatUsersListItem = ({ user, onToggleUser }) => {
  return (
    <li className={classes.selectChatUsersListItem}>
      <SearchUserInput
        type="checkbox"
        onChange={() => onToggleUser(user)}
        id={user.id}
        label={user.name}
        className={classes.input}
      />
    </li>
  );
};
