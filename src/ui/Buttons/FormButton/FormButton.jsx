import classes from "./FormButton.module.scss";

export const FormButton = ({ buttonText, type, className, onClick}) => {
  return (
    <button type={type} onClick={onClick} className={`${classes.loginButton} ${className || ""}`}>
      {buttonText}
    </button>
  );
};
