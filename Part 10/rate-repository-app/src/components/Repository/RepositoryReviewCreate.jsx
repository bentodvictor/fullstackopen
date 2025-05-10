import { Formik } from "formik";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useReview from "../../hooks/useReview";
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

const RepositoryReviewCreate = () => {
  const [reviewMutate] = useReview();
  const navigate = useNavigate();

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    review: "",
  };
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Owner is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
      .number()
      .min(0, "Rating must be at least 0")
      .max(100, "Rating must be at most 100")
      .required("Rating is required"),
    review: yup.string().optional(),
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const newReview = await reviewMutate({
        ownerName,
        repositoryName,
        rating,
        review,
      });

      navigate(`/repository/${newReview.createReview.repository.id}`);
    } catch (error) {
      console.error(error);
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
            testId="ownerName"
            style={styles.input}
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
            placeholderTextColor={styles.input.color}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>{errors.ownerName}</Text>
          )}
          <TextInput
            testId="repositoryName"
            style={styles.input}
            placeholder="Repository name"
            value={values.name}
            onChangeText={handleChange("repositoryName")}
            placeholderTextColor={styles.input.color}
          ></TextInput>
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>{errors.repositoryName}</Text>
          )}
          <TextInput
            testId="rating"
            style={styles.input}
            placeholder="Rating between 0 and 100"
            value={values.rating}
            onChangeText={handleChange("rating")}
            placeholderTextColor={styles.input.color}
            keyboardType="numeric"
          ></TextInput>
          {touched.rating && errors.rating && (
            <Text style={styles.error}>{errors.rating}</Text>
          )}
          <TextInput
            testId="review"
            style={styles.input}
            placeholder="Review"
            value={values.review}
            onChangeText={handleChange("review")}
            placeholderTextColor={styles.input.color}
          ></TextInput>
          {touched.review && errors.review && (
            <Text style={styles.error}>{errors.review}</Text>
          )}
          <View style={styles.button}>
            <Button
              title="Create a review"
              onPress={() => {
                handleSubmit();
              }}
            ></Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RepositoryReviewCreate;
