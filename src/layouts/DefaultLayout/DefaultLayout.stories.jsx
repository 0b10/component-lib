import React from "react";
// 3rd party
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { DefaultLayout } from "./DefaultLayout";
import { ThemeProvider } from "../../components";
import {
  navBarStubPropsFactory,
  sideMenuButtonStubPropsFactory
} from "../../components";

const collectionName = "Layouts";

storiesOf(collectionName, module).add("DefaultLayout", () => (
  <ThemeProvider>
    <CssBaseLine />
    <DefaultLayout
      navBarProps={navBarStubPropsFactory()}
      sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
    />
  </ThemeProvider>
));
