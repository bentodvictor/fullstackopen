import { Link } from "react-router-native";
import Text from "../Text";

const AppBarTab = ({ tabName, to }) => (
  <Link to={to}>
    <Text
      fontWeight="bold"
      fontSize="subheading"
      color="textWhite"
      bgColor="secondary"
      sPadding="general"
    >
      {tabName}
    </Text>
  </Link>
);

export default AppBarTab;
