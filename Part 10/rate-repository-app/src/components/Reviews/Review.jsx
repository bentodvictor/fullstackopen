import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import useReviewDelete from "../../hooks/useReviewDelete";
import theme from "../../theme";

const styles = StyleSheet.create({
  repository: {
    backgroundColor: theme.colors.bgWhite,
    padding: theme.padding.general,
  },
  review: {
    flexDirection: "row",
  },
  rating: {
    borderColor: "#1D5C9C",
    borderWidth: 3,
    width: 50,
    height: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 10,
  },
  rating_text: {
    color: "#1D5C9C",
    fontWeight: "bold",
    fontSize: 18,
  },
  reviews: {
    width: 300,
    margin: 10,
  },
  reviews_username: {
    fontWeight: "bold",
  },
  reviews_create_at: {
    marginBottom: 5,
    color: "grey",
  },
  reviews_text: {},
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: theme.margin.top * 2,
  },
});

const formatCreateAt = (createAt) => {
  const date = new Date(createAt);

  // Get parts
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  // Format
  return `${month}.${day}.${year}`;
};

const Review = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReviewMutate] = useReviewDelete();

  return (
    <View style={styles.repository}>
      <View style={styles.review}>
        <View style={styles.rating}>
          <Text style={styles.rating_text}>{review.node.rating}</Text>
        </View>
        <View style={styles.reviews}>
          <Text style={styles.reviews_username}>
            {review.node.repository.fullName}
          </Text>
          <Text style={styles.reviews_create_at}>
            {formatCreateAt(review.node.createdAt)}
          </Text>
          <Text style={styles.reviews_text}>{review.node.text}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title="View repository"
          onPress={() => navigate(`/repository/${review.node.repositoryId}`)}
        ></Button>
        <Button
          color="#AA0000"
          title="Delete review"
          onPress={() =>
            Alert.alert(
              "Delete review",
              "Are you sure yout want to delete this review?",
              [
                {
                  text: "Cancel",
                },
                {
                  text: "Delete",
                  onPress: () => {
                    deleteReviewMutate(review.node.id);
                    refetch();
                  },
                },
              ]
            )
          }
        ></Button>
      </View>
    </View>
  );
};

export default Review;
