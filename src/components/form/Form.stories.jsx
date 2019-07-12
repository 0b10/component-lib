import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// 3rd party
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Box, Grid } from "@material-ui/core";
// Local
import { Form } from "./Form";
import { withValidation } from "./withValidation";
import { ThemeProvider } from "../ThemeProvider";
import { yupValidator, schema } from "./__helpers__/validation";
import { getMockFormProps } from "./__helpers__/props";

const componentName = "Form";

storiesOf(componentName, module)
  .add("Typical state", () => (
    <ThemeProvider>
      <CssBaseLine />
      <Grid container>
        <Grid item>
          <Box p={10}>
            <Form
              {...getMockFormProps()}
              handleReset={action("handleReset()")}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ))
  .add("Custom buttons", () => (
    <ThemeProvider>
      <CssBaseLine />
      <Grid container>
        <Grid item>
          <Box p={10}>
            <Form
              {...getMockFormProps()}
              buttons={{
                submit: {
                  text: "Foo",
                  variant: "outlined",
                  fullWidth: true,
                  color: "inherit",
                  disabled: true
                },
                reset: {
                  text: "Bar",
                  variant: "contained",
                  fullWidth: false,
                  color: "secondary"
                }
              }}
              handleReset={action("handleReset()")}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ))
  .add("withValidation", () => {
    const ValidatingForm = withValidation(yupValidator(schema))(Form);
    return (
      <ThemeProvider>
        <CssBaseLine />
        <Grid container>
          <Grid item>
            <Box p={10}>
              <ValidatingForm form={{ ...getMockFormProps() }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  });
