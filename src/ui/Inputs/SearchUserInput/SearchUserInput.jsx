import classes from "./SearchUserInput.module.scss";
export const SearchUserInput = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`${classes.input} ${className || ""}`}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
