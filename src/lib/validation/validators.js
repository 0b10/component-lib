/**
 * A Yup validator. A closure around a validator function. Use this to initialise a validating
 *  function.
 * @param {Object} schema - A Yup schema object that should specify all intended validation targets.
 * @returns {function} - a function used to validate values against the schema.
 * @example yupValidator(schema)({ ...values }) => { [username]: "Foo", [password]: "Bar" }
 */
export const yupValidator = (schema, options = {}) => {
  // ! abortEarly: false,  means yup evaluates all fields, and return messages as an array
  // ! This MUST be false, else breakages occur below.
  // ! It's also very convenient to get all messages in one go. DO NOT CHANGE.
  if (options.abortEarly === true)
    throw Error("yup options: abortEarly cannot be true");
  const mutatedOpts = Object.freeze({ ...options, ...{ abortEarly: false } });

  /**
   * A function for validating values against the provided schema.
   * @param {Object} values - Key value pairs, where each key should match a single key in the
   *  schema, and the value is typically a field value.
   * @example validate({ field1: "foo", field2: "bar" })
   * @returns {Object} - { valid: true } or { valid: false, fieldName: "message", ... }
   */
  return async values => {
    try {
      await schema.validate(values, mutatedOpts);
      return Object.freeze({ valid: true });
    } catch (e) {
      // build fields = { [name]: message }
      const fields = {};
      e.inner.forEach(({ path, message }) => (fields[path] = message));

      // now { valid, field1, field2 } etc
      return Object.freeze({ valid: false, ...fields });
    }
  };
};
