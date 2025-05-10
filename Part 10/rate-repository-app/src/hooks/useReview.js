import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        console.error(error.graphQLErrors.map((e) => e.message));
      } else if (error) {
        console.error(error.message);
      }
    },
  });

  const reviewMutate = async ({
    ownerName,
    repositoryName,
    rating,
    review,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text: review,
        },
      },
    });

    return data;
  };

  return [reviewMutate, result];
};

export default useReview;
