import { Button, Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  repository: {
    backgroundColor: theme.colors.bgWhite,
    padding: theme.padding.general,
  },
  repositoryInfo: {
    flexDirection: theme.display.flexRow,
    width: "80%",
  },
  repositoryAvatar: {
    width: theme.image.tinyLogo.width,
    height: theme.image.tinyLogo.height,
  },
  repositoryData: {
    paddingLeft: theme.padding.general,
  },
  repositoryDataName: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.margin.bottom * 2,
  },
  repositoryDataLanguage: {
    marginTop: theme.margin.top * 2,
    alignSelf: "flex-start",
  },
  repositoryStatus: {
    flexDirection: theme.display.flexRow,
    justifyContent: theme.justify.evenly,
    marginTop: theme.margin.top * 4,
  },
});

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(number);

const Repository = ({ item }) => (
  <View style={styles.repository}>
    <View style={styles.repositoryInfo}>
      <View>
        <Image
          style={styles.repositoryAvatar}
          source={{ uri: item.ownerAvatarUrl }}
        />
      </View>
      <View style={styles.repositoryData}>
        <Text style={styles.repositoryDataName}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.repositoryDataLanguage}>
          <Button title={item.language} />
        </View>
      </View>
    </View>
    <View style={styles.repositoryStatus}>
      <View>
        <Text>{formatNumber(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View>
        <Text>{formatNumber(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View>
        <Text>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View>
        <Text>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default Repository;
