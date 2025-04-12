import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./LoginForm.module.scss";
import { fetchUsers } from "../../../api/usersThunk";
import { setCurrentUser } from "../../../store/Slices/usersSlice";
import { Register } from "../Register/Register";
import { Logo } from "../../Chat/Sidebar/Logo/Logo";
import { EmailInput } from "../../../ui/Inputs/EmailInput/EmailInput";
import { FormButton } from "../../../ui/Buttons/FormButton/FormButton";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const getEmailAddress = (event) => {
    setEmail(event.target.value.trim());
  };

  const checkEmail = (event) => {
    event.preventDefault();

    const user = users.find((user) => user.email === email);

    if (user) {
      dispatch(setCurrentUser(user));
      navigate("/chat");
    } else {
      alert("You are not registered!");
    }
    setEmail("");
  };

  return (
    <div className={classes.formWrapper}>
      <Logo className={classes.logo} />
      <form className={classes.loginForm} onSubmit={checkEmail}>
        <h3 className={classes.formTitle}>Вход</h3>
        <EmailInput
          label="Электронная почта"
          email={email}
          handleChange={getEmailAddress}
        />
        <FormButton buttonText="Войти" type="submit" />
        <Register text="Зарегистрироваться" />
      </form>
    </div>
  );
};
