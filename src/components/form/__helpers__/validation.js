import * as yup from "yup";

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

/**
 * Use thes to determien validation messages, and the expected length of the input.
 */
// ! These messages (except required) must begin with "Must ", to keep tests happy
// ! required must not change from "Required"
// ! In fact, don't change any of these values
export const validationMessages = Object.freeze({
  username: {
    min: {
      message: "Must be at least 3 characters",
      length: 3
    },
    max: {
      message: "Must be less than 15 characters",
      length: 15
    },
    required: {
      message: "Required"
    }
  },
  password: {
    min: {
      message: "Must be at least 8 characters",
      length: 8
    },
    max: {
      message: "Must not be more than 30 characters",
      length: 30
    },
    required: {
      message: "Required"
    }
  }
});

export const schema = yup.object().shape({
  username: yup
    .string()
    .min(
      validationMessages.username.min.length,
      validationMessages.username.min.message
    )
    .max(
      validationMessages.username.max.length,
      validationMessages.username.max.message
    )
    .required(validationMessages.username.required.message),
  password: yup
    .string()
    .min(
      validationMessages.password.min.length,
      validationMessages.password.min.message
    )
    .max(
      validationMessages.password.max.length,
      validationMessages.password.max.message
    )
    .required(validationMessages.password.required.message)
});
