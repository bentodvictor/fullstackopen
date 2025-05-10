import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useReviewDelete = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        console.error(error.graphQLErrors.map((e) => e.message));
      } else if (error) {
        console.error(error.message);
      }
    },
  });

  const deleteReviewMutate = async (deleteReviewId) => {
    const { data } = await mutate({
      variables: {
        deleteReviewId,
      },
    });

    return data;
  };

  return [deleteReviewMutate, result];
};

export default useReviewDelete;
