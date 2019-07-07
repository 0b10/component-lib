import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// 3rd part
import { Box, Grid } from "@material-ui/core";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { Form } from "./Form";
import { ThemeProvider } from "../ThemeProvider";
import { getMockFormProps } from "./__helpers__/stories";
import { FieldSet } from "./FieldSet";

const packageName = "Form";

storiesOf(packageName, module).add("FieldSet", () => (
  <ThemeProvider>
    <CssBaseLine />
    <Grid container>
      <Grid item>
        <Box p={10}>
          <FieldSet legend="Login">
            <Form
              {...getMockFormProps()}
              handleReset={action("handleReset()")}
            />
          </FieldSet>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
));
