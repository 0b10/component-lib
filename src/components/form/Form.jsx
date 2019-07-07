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
    const { buttons, messages } = props;
    return (
      <Grid container>
        <form onSubmit={props.handleSubmit}>
          {props.textFields.map((tfProps, index) => {
            const { name } = tfProps;
            return (
              // ! messages[name] only exists if there's an error for that field
              <Grid item key={index}>
                <TextField
                  error={messages && typeof messages[name] === "string"}
                  variant="outlined"
                  size="large"
                  fullWidth
                  {...tfProps}
                />
                {
                  <Box py={1}>
                    <ValidationMessage color="error" align="right">
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
            <SubmitButton type="submit" {...props.buttons.submit}>
              {buttons.submit.text}
            </SubmitButton>
          </Grid>
          <Grid item>
            <Button
              type="reset"
              onClick={props.handleReset}
              {...props.buttons.reset}
            >
              {buttons.reset.text}
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

// >>> STYLES >>>
const SubmitButton = styled(Button)(() => ({
  fontWeight: "bold",
  marginBottom: "20px"
}));

const ValidationMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: "bold"
}));

// >>> PROPTYPES >>>
// ! Everything except the buttons are required.
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
  // ** Use to pass MUI props. Overriding any of these means you have to specify the full object */
  buttons: PropTypes.shape({
    // No point in defining these as they are passed to MUI - it can handle types
    submit: PropTypes.object,
    reset: PropTypes.object
  })
};

Form.defaultProps = {
  buttons: {
    submit: {
      text: "Submit",
      variant: "contained",
      fullWidth: true,
      size: "large",
      color: "primary"
    },
    reset: {
      text: "Reset",
      variant: "outlined",
      fullWidth: true,
      size: "large"
    }
  }
};
