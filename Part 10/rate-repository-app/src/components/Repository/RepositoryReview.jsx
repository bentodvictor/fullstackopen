import { StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  repository: {
    backgroundColor: theme.colors.bgWhite,
    padding: theme.padding.general,
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

const RepositoryReview = ({ review }) => {
  return (
    <View style={styles.repository}>
      <View style={styles.rating}>
        <Text style={styles.rating_text}>{review.node.rating}</Text>
      </View>
      <View style={styles.reviews}>
        <Text style={styles.reviews_username}>{review.node.user.username}</Text>
        <Text style={styles.reviews_create_at}>
          {formatCreateAt(review.node.createdAt)}
        </Text>
        <Text style={styles.reviews_text}>{review.node.text}</Text>
      </View>
    </View>
  );
};

export default RepositoryReview;
