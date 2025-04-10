import classes from "./FormButton.module.scss";

export const FormButton = ({ buttonText, type, className}) => {
  return (
    <button type={type} className={`${classes.loginButton} ${className || ""}`}>
      {buttonText}
    </button>
  );
};
