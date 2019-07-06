import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// 3rd part
import { Box, Grid } from "@material-ui/core";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { Form } from "./Form";
import { ThemeProvider } from "../ThemeProvider";
import * as helpers from "./__helpers__/stories";
import { FieldSet } from "./FieldSet";

const componentName = "FieldSet";

storiesOf(componentName, module).add("Typical state", () => (
  <ThemeProvider>
    <CssBaseLine />
    <Grid container>
      <Grid item>
        <Box p={10}>
          <FieldSet legend="Login">
            <Form
              {...helpers.getMockFormProps()}
              handleReset={action("handleReset()")}
            />
          </FieldSet>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
));
