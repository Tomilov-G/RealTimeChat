import { useSelector } from "react-redux";
import classes from "./UserInfo.module.scss";

export const UserInfo = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  if (!currentUser) {
    return <p>Loading...</p>;
  }
  return (
    <div className={classes.userInfo}>
      <img
        src={currentUser.avatar}
        alt="Avatar"
        className={classes.userImage}
      />
      <p className={classes.userName}>{currentUser.name}</p>
    </div>
  );
};
