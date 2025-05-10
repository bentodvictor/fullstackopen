import { Formik } from "formik";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { useSignUp } from "../hooks/useSignUp";
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

export default function SignUp() {
  const [signUp] = useSignUp();
  const navigate = useNavigate();
  const initialValues = { username: "", password: "", passwordConfirm: "" };

  const validationSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required("Username is required"),
    password: yup.string().min(5).max(50).required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;

    try {
      await signUp({ username, password });
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
            testID="username"
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
            testID="password"
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
          <TextInput
            testID="passwordConfirm"
            style={styles.input}
            placeholder="Confirm Password"
            value={values.passwordConfirm}
            onChangeText={handleChange("passwordConfirm")}
            placeholderTextColor={styles.input.color}
            secureTextEntry
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <Text style={styles.error}>{errors.passwordConfirm}</Text>
          )}
          <View style={styles.button}>
            <Button title="Sign In" onPress={handleSubmit}></Button>
          </View>
        </View>
      )}
    </Formik>
  );
}
