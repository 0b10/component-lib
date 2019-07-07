/**
 * Yup validator. Pass schema, and { ...values }
 * @param {Object} schema - A Yup schema object that should consider all field names provided to
 *  the Form component.
 * @returns {Object} - { valid: true } or { valid: false, [fieldname]: "message", [...] }
 * @example yupValidator(schema)({ ...values }) => { [username]: "Foo", [password]: "Bar" }
 */
export const yupValidator = (
  schema,
  options = { abortEarly: false } // ! Evaluate all fields. Must be false, else breakages.
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
