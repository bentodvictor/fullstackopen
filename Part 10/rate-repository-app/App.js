import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import Main from "./src/components/Main";
import { registerRootComponent } from "expo";
import { StyleSheet } from "react-native";
import theme from "./src/theme";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

registerRootComponent(App);

export default App;
