import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/authReducer";

export const LogoutForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.auth);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <div>
      <span>{user?.username} logged-in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
