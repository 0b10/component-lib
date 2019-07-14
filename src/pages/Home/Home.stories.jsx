import React from "react";
// 3rd party
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { Home } from "./Home";
import { ThemeProvider } from "../../components";

const collectionName = "Pages";

storiesOf(collectionName, module).add("Home", () => (
  <ThemeProvider>
    <CssBaseLine />
    <Home />
  </ThemeProvider>
));
