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

  // Fetch users if not loaded
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  // Handle email input change
  const getEmailAddress = (event) => {
    setEmail(event.target.value.trim());
  };

  // Handle form submission to check email
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
        <h3 className={classes.formTitle}>Login</h3>
        <EmailInput
          label="Email"
          email={email}
          handleChange={getEmailAddress}
        />
        <FormButton buttonText="Login" type="submit" />
        <Register text="Register" />
      </form>
    </div>
  );
};
