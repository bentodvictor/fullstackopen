import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";

    dispatch(userLogin({ username, password }));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username: <input name="username" />
        </div>
        <br />
        <div>
          password: <input name="password" />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
