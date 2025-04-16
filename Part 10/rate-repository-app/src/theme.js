import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textWhite: "#f0f0f0",
    primary: "#0366d6",
    bgSecondary: "#24292e",
    bgMain: "#e1e4e8",
    bgWhite: "#fff",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  margin: {
    general: 5,
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  padding: {
    general: 14,
  },
  image: {
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  },
  display: {
    flexRow: "row",
    flexColumn: "column",
  },
  justify: {
    evenly: "space-evenly",
  },
  input: {
    color: "#AAA",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
};

export default theme;
