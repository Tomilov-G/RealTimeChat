import { faUsers, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import classes from "./IconsBlock.module.scss";
import { IconsBlockItem } from "./IconsBlockItem/IconsBlockItem";

export const IconsBlock = () => {
  const icons = [
    {
      to: "/profile",
      icon: faCircleUser,
      id: "user-profile",
      tooltip: "Мой профиль",
    },
    {
      to: "/createChat",
      icon: faUsers,
      id: "create-chat",
      tooltip: "Создать чат",
    },
  ];
  return (
    <div className={classes.icons}>
      {icons.map((icon) => (
        <IconsBlockItem key={icon.id} {...icon} />
      ))}
    </div>
  );
};
