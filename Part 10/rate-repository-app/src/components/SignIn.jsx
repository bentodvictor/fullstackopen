import { Formik } from "formik";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  input: {
    color: theme.input.color,
    borderColor: theme.input.color,
    height: theme.input.height,
    marginTop: theme.input.margin,
    marginLeft: theme.input.margin,
    marginRight: theme.input.margin,
    borderWidth: theme.input.borderWidth,
    padding: theme.input.padding,
  },
  section: {
    backgroundColor: theme.colors.bgWhite,
  },
  button: {
    margin: theme.input.margin,
  },
  error: {
    color: "#d73a4a",
    marginLeft: theme.input.margin,
  },
});

const initialValues = { username: "", password: "" };

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, touched, errors }) => (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange("username")}
            placeholderTextColor={styles.input.color}
          />
          {touched.username && errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            placeholderTextColor={styles.input.color}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <View style={styles.button}>
            <Button title="Sign In" onPress={handleSubmit}></Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
