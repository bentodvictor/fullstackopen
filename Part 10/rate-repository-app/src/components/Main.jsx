import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import { Routes, Route, Navigate } from "react-router-native";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
  bgColor: {
    backgroundColor: theme.colors.bgMain,
    width: "100%",
    height: "100%",
  },
});

const HandleSigIn = (values) => {
  console.log({ values });
};

const Main = () => {
  return (
    <View style={(styles.container, styles.bgColor)}>
      <AppBar />
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sigin" element={<SignIn onSubmit={HandleSigIn} />} />
      </Routes>
    </View>
  );
};

export default Main;
