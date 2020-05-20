// Here goes the schema for the form
import * as yup from "yup";

// valid formValues should be like follows:
const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "The username must be at least three characters long")
    .required("The username is a required field"),
  email: yup
    .string()
    .email("The email must be a valid email address")
    .required("The email is a required field"),
  role: yup.string().required("The role is a required field"),
  civil: yup.string().required("The civil status is required"),
});

export default formSchema;
