import {
  faUsers,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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
    {
      to: "/searchCreatedChats",
      icon: faMagnifyingGlass,
      id: "search-create-chat",
      tooltip: "Поиск чатов",
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
