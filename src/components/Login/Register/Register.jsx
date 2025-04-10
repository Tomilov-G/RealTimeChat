import { Link } from "react-router-dom";
import classes from "./Register.module.scss";

export const Register = ({ text }) => {
  return (
    <Link to="/createAccount" className={classes.registerLink}>
      {text}
    </Link>
  );
};
