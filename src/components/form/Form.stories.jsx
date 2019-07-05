import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Form } from "./Form";

const componentName = "Form";

storiesOf(componentName, module).add("Typical state", () => (
  <Form {...getMockProps()} isValid={action("Validator called")} />
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
