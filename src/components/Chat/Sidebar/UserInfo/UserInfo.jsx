import { useSelector } from "react-redux";
import classes from "./UserInfo.module.scss";

export const UserInfo = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  if (!currentUser) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className={classes.userInfo}>
      <img src={currentUser.avatar} alt="Фото" className={classes.userImage} />
      <p className={classes.userName}>{currentUser.name}</p>
    </div>
  );
};
