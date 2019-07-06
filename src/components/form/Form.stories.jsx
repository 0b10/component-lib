import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// 3rd party
import CssBaseLine from "@material-ui/core/CssBaseline";
import * as yup from "yup";
import { Box, Grid } from "@material-ui/core";
// Local
import { Form } from "./Form";
import { withValidation } from "./withValidation";
import { ThemeProvider } from "../ThemeProvider";

const componentName = "Form";

storiesOf(componentName, module)
  .add("Typical state", () => (
    <ThemeProvider>
      <CssBaseLine />
      <Grid container>
        <Grid item>
          <Box p={10}>
            <Form {...getMockProps()} handleReset={action("handleReset()")} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ))
  .add("withValidation", () => {
    const ValidatingForm = withValidation(yupValidator(schema))(Form);
    return (
      <ThemeProvider>
        <CssBaseLine />
        <Grid container>
          <Grid item>
            <Box p={10}>
              <ValidatingForm form={{ ...getMockProps() }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  });

// >>> MOCK DATA >>>
const textFields_ = [
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" }
];

const getMockProps = (
  textFields = textFields_,
  handleSubmit = event => event.preventDefault(),
  handleReset = () => null
) => ({
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
const yupValidator = (
  schema,
  options = { abortEarly: false }
) => async values => {
  try {
    await schema.validate(values, options);
    return { valid: true };
  } catch (e) {
    // build fields = { [name]: message }
    const fields = {};
    e.inner.forEach(({ path, message }) => (fields[path] = message));

    // now { valid, field1, field2 } etc
    return { valid: false, ...fields };
  }
};

const schema = yup.object().shape({
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
