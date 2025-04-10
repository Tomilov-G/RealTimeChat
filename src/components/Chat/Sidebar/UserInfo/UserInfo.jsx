import { useSelector } from "react-redux";
import classes from "./UserInfo.module.scss";

export const UserInfo = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  if (!currentUser) {
    return <p>Загрузка...</p>;
  }
  const currentUserImage = currentUser.avatar;
  const currentUserName = currentUser.name;

  return (
    <div className={classes.userInfo}>
      <img src={currentUserImage} alt="Фото" className={classes.userImage} />
      <p className={classes.userName}>{currentUserName}</p>
    </div>
  );
};
