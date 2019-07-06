import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";

/**
 * A Form, with configurable fields, via the textFields prop.
 * The 'messages' prop must be in the form of { fieldname: message, fieldname2: message }
 */
export class Form extends PureComponent {
  render() {
    const { props } = this;
    const { buttons } = props;
    return (
      <Grid container>
        <form onSubmit={props.handleSubmit}>
          {props.textFields.map((tfProps, index) => {
            const { name } = tfProps;
            const { messages } = props;
            return (
              // ! messages[name] only exists if there's an error for that field
              <Grid item key={index}>
                <TextField
                  error={messages && typeof messages[name] === "string"}
                  variant="outlined"
                  size="large"
                  {...tfProps}
                />
                {
                  <Box py={1}>
                    <ValidationMessage align="right">
                      {(messages && messages[name]) || (
                        <React.Fragment>&nbsp;</React.Fragment>
                      )}
                    </ValidationMessage>
                  </Box>
                }
              </Grid>
            );
          })}
          <Grid item>
            <SubmitButton
              variant={(buttons && buttons.variant) || "contained"}
              type="submit"
              fullWidth={true}
              size="large"
              color="primary"
            >
              {(buttons && buttons.submit) || "Submit"}
            </SubmitButton>
          </Grid>
          <Grid item>
            <Button
              variant={(buttons && buttons.variant) || "outlined"}
              type="reset"
              onClick={props.handleReset}
              fullWidth={true}
              size="large"
            >
              {(buttons && buttons.reset) || "Reset"}
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

const SubmitButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: "20px"
}));

const ValidationMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: "bold"
}));

Form.propTypes = {
  //** An array of objects describing MUI TextField props */
  textFields: PropTypes.arrayOf(
    PropTypes.shape({
      // ** html label */
      label: PropTypes.string.isRequired,
      //** html field name */
      name: PropTypes.string.isRequired,
      //** html input type: text, email, password etc */
      type: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  // ** Validation message { [fieldname]: "message" } || undefined */
  message: PropTypes.objectOf(PropTypes.string.isRequired),
  // ** It should reset the form and validation messages */
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  buttons: PropTypes.shape({
    //** The submit button text */
    submit: PropTypes.string,
    //** The reset button text */
    reset: PropTypes.string,
    //** An MUI variant */
    variant: PropTypes.string
  })
};
