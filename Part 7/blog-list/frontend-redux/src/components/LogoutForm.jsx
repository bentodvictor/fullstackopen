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
      <p>
        <span>{user?.username}</span> <span>logged-in</span>
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
