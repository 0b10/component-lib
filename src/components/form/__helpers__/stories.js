import * as yup from "yup";

export const textFields_ = Object.freeze([
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" }
]);

export const getMockFormProps = (
  textFields = textFields_,
  handleSubmit = event => event.preventDefault(),
  handleReset = () => null
) =>
  Object.freeze({
    textFields,
    handleSubmit,
    handleReset
  });

/**
 * Yup validator. Pass schema, and { ...values }
 * @param {Object} schema - A Yup schema object that should consider all field names provided to
 *  the Form component.
 * @returns {Object} - { valid: true } or { valid: false, [fieldname]: "message", [...] }
 * @example yupValidator(schema)({ ...values }) => { [username]: "Foo", [password]: "Bar" }
 */
export const yupValidator = (
  schema,
  options = { abortEarly: false }
) => async values => {
  try {
    await schema.validate(values, options);
    return Object.freeze({ valid: true });
  } catch (e) {
    // build fields = { [name]: message }
    const fields = {};
    e.inner.forEach(({ path, message }) => (fields[path] = message));

    // now { valid, field1, field2 } etc
    return Object.freeze({ valid: false, ...fields });
  }
};

export const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be less than 15 characters")
    .required("Required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(30, "Must not be more than 30 characters")
    .required("Required")
});
