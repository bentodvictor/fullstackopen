import { Link } from "react-router-dom";
import { MenuStyle } from "../styles";
import { LogoutForm } from "./LogoutForm";
import { useSelector } from "react-redux";

export const Menu = () => {
  const user = useSelector((state) => state.auth);

  const loggedHtml = (
    <div>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <LogoutForm />
    </div>
  );

  return (
    <MenuStyle>{user ? loggedHtml : <Link to="/login">login</Link>}</MenuStyle>
  );
};
