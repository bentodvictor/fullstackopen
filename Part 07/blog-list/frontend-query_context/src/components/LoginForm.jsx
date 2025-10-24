import {
  useNotificationDispatch,
  useNotificationValue,
} from "../NotificationContext";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useUserDispatch } from "../UserContext";

export const LoginForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const notificationValue = useNotificationValue();
  const userDispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = event.target;
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      userDispatch({ type: "setUser", payload: user });
      event.target.username.value = "";
      event.target.password.value = "";
    } catch (ex) {
      const notificationPayload = {
        types: "error",
        message: ex.response.data.error,
      };
      notificationDispatch({
        type: "notify",
        payload: notificationPayload,
      });
    }
  };

  if (notificationValue !== null) {
    setTimeout(() => {
      notificationDispatch({ types: "clean" });
    }, 5000);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username: <input data-testid="username" name="username" type="text" />
        </div>
        <div>
          password:{" "}
          <input data-testid="password" name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
