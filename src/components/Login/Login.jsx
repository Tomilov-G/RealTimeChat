import classes from "./Login.module.scss";
import { LoginForm } from "./LoginForm/LoginForm";
export const Login = () => {
  return (
    <section className={classes.loginSection}>
      <LoginForm />
    </section>
  );
};
