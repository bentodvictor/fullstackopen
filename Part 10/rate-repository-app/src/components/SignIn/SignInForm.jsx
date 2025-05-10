import { Formik } from "formik";
import { Button, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../../theme";
import Text from "../Text";

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

const SignInForm = ({ onSubmit }) => {
  const initialValues = { username: "", password: "" };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

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
          <View style={styles.button}>
            <Button title="Sign In" onPress={handleSubmit}></Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
