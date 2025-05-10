import { Button, Image, Linking, StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  singleRepository: {
    marginBottom: 10,
  },
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
  url: {
    width: "100%",
    marginTop: theme.margin.top * 4,
    alignSelf: "center",
  },
});

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(number);

const Repository = ({ item, showUrl = false }) => {
  return (
    <View
      testID="repositoryItem"
      style={[styles.repository, showUrl && styles.singleRepository]}
    >
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
      {showUrl && (
        <View style={styles.url}>
          <Button
            onPress={() => Linking.openURL(item.url)}
            title="Open in GitHub"
          ></Button>
        </View>
      )}
    </View>
  );
};

export default Repository;
