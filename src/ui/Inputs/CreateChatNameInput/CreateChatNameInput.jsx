import classes from "./CreateChatNameInput.module.scss";

export const CreateChatNameInput = ({ label, type, id, placeholder, onChange, value}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={classes.input}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
