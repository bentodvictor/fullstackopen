import { useNavigate } from "react-router-native";
import useSignIn from "../../hooks/useSignIn";
import SignInForm from "./SignInForm";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
