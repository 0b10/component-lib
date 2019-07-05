import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Form } from "./Form";
import * as yup from "yup";

const componentName = "Form";

storiesOf(componentName, module)
  .add("Typical state", () => (
    <Form {...getMockProps()} isValid={action("Validator called")} />
  ))
  .add("With validation", () => (
    <Form {...getMockProps()} isValid={schema.isValid.bind(schema)} />
  ));

// >>> MOCK DATA >>>
const textFields_ = [
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" }
];

const getMockProps = (textFields = textFields_, isValid = () => null) => ({
  isValid,
  textFields
});

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});
