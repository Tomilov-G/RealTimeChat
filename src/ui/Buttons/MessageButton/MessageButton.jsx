import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./MessageButton.module.scss";
export const MessageButton = ({ icon, onClick, type }) => {
  return (
    <button className={classes.button} onClick={onClick} type={type}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
