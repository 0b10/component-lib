import React from "react";
// 3rd party
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { DefaultLayout } from "./DefaultLayout";
import { ThemeProvider } from "../../components";
import * as stubs from "./__helpers__/stubs";

const collectionName = "Layouts";

storiesOf(collectionName, module).add("DefaultLayout", () => (
  <ThemeProvider>
    <CssBaseLine />
    <DefaultLayout {...stubs.defaultLayoutProps} />
  </ThemeProvider>
));
