import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import classes from "./Logo.module.scss";

export const Logo = ({ className }) => {
  return (
    <div className={`${classes.logo} ${className || ""}`}>
      LiveChat <FontAwesomeIcon icon={faComments} />
    </div>
  );
};
