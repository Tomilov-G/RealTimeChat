import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import classes from "./IconsBlockItem.module.scss";

export const IconsBlockItem = ({ to, icon, id, tooltip }) => {
  return (
    <>
      <Link to={to} className={classes.link}>
        <FontAwesomeIcon id={id} icon={icon} />
      </Link>
      <Tooltip anchorSelect={`#${id}`} place="left" arrowColor="white">
        {tooltip}
      </Tooltip>
    </>
  );
};
