import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "3 characters minimum")
    .max(15, "15 characters maximum")
    .required("Required"),
  password: yup
    .string()
    .min(8, "8 characters minimum")
    .max(30, "30 characters maximum")
    .required("Required")
});
