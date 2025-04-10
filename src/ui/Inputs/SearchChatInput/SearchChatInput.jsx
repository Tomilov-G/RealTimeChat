import classes from "./SearchChatInput.module.scss";
const SearchChatInput = () => {
  return (
    <div className={classes.wrapper}>
      <input className={classes.input} type="text" placeholder="Найти чат" />
    </div>
  );
};
export default SearchChatInput;
