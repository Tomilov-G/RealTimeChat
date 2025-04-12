import classes from "./CreateChatDescriptionTextArea.module.scss";

export const CreateChatDescriptionTextArea = ({
  id,
  label,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        className={classes.textArea}
        onChange={onChange}
        value={value}
      />
    </>
  );
};
