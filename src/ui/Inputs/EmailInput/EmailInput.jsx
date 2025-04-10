import classes from "./EmailInput.module.scss";

export const EmailInput = ({ handleChange, email, label }) => {
  return (
    <div className={classes.wrapper}>
      <label htmlFor="emailInput" className={classes.label}>
        {label}
      </label>
      <input
        value={email}
        onChange={handleChange}
        className={classes.input}
        type="email"
        id="emailInput"
        placeholder="name@email.com"
      />
    </div>
  );
};
