import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Form } from "./Form";
import * as yup from "yup";

const componentName = "Form";

storiesOf(componentName, module)
  .add("Typical state", () => (
    <Form {...getMockProps()} validate={action("Validator called")} />
  ))
  .add("With validation", () => (
    <Form {...getMockProps()} validate={validate(schema)} />
  ));

// >>> MOCK DATA >>>
const textFields_ = [
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" }
];

const getMockProps = (textFields = textFields_, validate = () => null) => ({
  validate,
  textFields
});

/**
 * Yup validator. Pass schema, and { ...values }
 * @param {Object} schema - a Yup schema object
 * @returns {Object} - { valid, message, name }
 * @example validate(schema)({ ...values }) => { valid: false, message: "Foo", name: "bar" }
 */
const validate = schema => async values => {
  try {
    await schema.validate(values);
    return { valid: true };
  } catch (e) {
    return { valid: false, message: e.message, name: e.path };
  }
};

const schema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required")
});
