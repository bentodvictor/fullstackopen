import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { ME } from "../../graphql/queries";
import theme from "../../theme";
import Text from "../Text";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.bgSecondary,
  },
});

const AppBar = () => {
  let { loading, data } = useQuery(ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading && <Text>Loading...</Text>}
        {data?.me ? (
          <>
            <AppBarTab tabName="Repositories" to="/" />
            <AppBarTab tabName="Sign Out" to="/signout" />
          </>
        ) : (
          <>
            <AppBarTab tabName="Sign In" to="/signin" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
