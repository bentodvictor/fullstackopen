import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ME } from "../../graphql/queries";
import { ItemSeparator } from "../Repository/ItemSeparator";
import Review from "./Review";

const MyReviews = () => {
  const { loading, data, refetch, fetchMore } = useQuery(ME, {
    variables: {
      includeReviews: true,
      first: 3,
    },
    fetchPolicy: "cache-and-network",
  });

  const onEndReach = () => {
    const pageInfo = data?.me?.reviews?.pageInfo;
    const canFetchMore = !loading && pageInfo?.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        first: 3,
        includeReviews: true,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          ...previousResult,
          me: {
            ...previousResult.me,
            reviews: {
              ...fetchMoreResult.me.reviews,
              edges: [
                ...previousResult.me.reviews.edges,
                ...fetchMoreResult.me.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews?.edges || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Review review={item} refetch={refetch} />}
      keyExtractor={({ node }) => node.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;
