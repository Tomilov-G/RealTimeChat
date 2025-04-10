import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChatModalWindow.module.scss";
export const ChatModalWindow = ({
  chatCreator,
  chatUsers,
  chatDescription,
}) => {
  return (
    <div className={classes.chatModalWindow}>
      <div className={classes.chatModalContent}>
        <h2 className={classes.title}>Описание чата</h2>
        <p>{chatDescription}</p>
        <hr className={classes.line} />
        <h2 className={classes.title}>Создатель чата</h2>
        <p>
          {chatCreator} <FontAwesomeIcon icon={faCrown} />
        </p>
        <hr className={classes.line} />
        <h2 className={classes.title}>Список участников</h2>
        <ul className={classes.chatUsersList}>{chatUsers}</ul>
      </div>
    </div>
  );
};
