import React from "react";
// 3rd party
import { storiesOf } from "@storybook/react";
// Local
import App from "./App";
import {
  navBarStubPropsFactory,
  postsStubPropsFactory,
  sideMenuButtonStubPropsFactory
} from "./components";

const collectionName = "App";

storiesOf(collectionName, module).add("Typical state", () => (
  <App
    navBarProps={navBarStubPropsFactory()}
    sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
    postProps={postsStubPropsFactory()}
  />
));
