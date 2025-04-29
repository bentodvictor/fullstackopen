import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  useEffect(() => {
    const removeUserToken = async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate("/signin", { replace: true });
    };

    removeUserToken();
  }, []);
};

export default SignOut;
