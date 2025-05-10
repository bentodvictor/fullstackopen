import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";

export const useSignUp = () => {
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        console.error(error.graphQLErrors.map((e) => e.message));
      } else if (error) {
        console.error(error.message);
      }
    },
  });

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          password,
          username,
        },
      },
    });

    if (data.createUser.id) {
      await signIn({ username, password });
    }

    return data;
  };

  return [signUp, result];
};
