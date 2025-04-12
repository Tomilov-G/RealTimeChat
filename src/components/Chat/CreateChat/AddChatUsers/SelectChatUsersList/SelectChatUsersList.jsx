import classes from "./SelectChatUsersList.module.scss";
import { SelectChatUsersListItem } from "./SelectChatUsersItem/SelectChatUsersListItem";

export const SelectChatUsersList = ({ users, onToggleUser }) => {
  return (
    <div className={classes.selectChatUsers}>
      <ul className={classes.selectChatUsersList}>
        {users.map((user) => (
          <SelectChatUsersListItem
            key={user.id}
            user={user}
            onToggleUser={onToggleUser}
          />
        ))}
      </ul>
    </div>
  );
};
