import React from "react";
import { storiesOf } from "@storybook/react";
import { Form } from "./Form";

const componentName = "Form";

storiesOf(componentName, module).add("Typical state", () => <Form />);
