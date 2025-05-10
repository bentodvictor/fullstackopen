import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./Repository";
import RepositoryReviewCreate from "./Repository/RepositoryReviewCreate";
import SingleRepository from "./Repository/SingleRepository";
import Reviews from "./Reviews";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgMain,
    width: "100%",
    height: "100%",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/repository/review" element={<RepositoryReviewCreate />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
