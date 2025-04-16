import { Button, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
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

const initialValues = { name: "", password: "" };

const validationSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={values.name}
            onChangeText={handleChange("name")}
            placeholderTextColor={styles.input.color}
          />
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
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
