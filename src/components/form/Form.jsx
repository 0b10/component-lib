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
    const {
      buttons,
      containerStyle,
      handleReset,
      handleSubmit,
      messages,
      refs,
      textFields
    } = props;

    return (
      <Grid style={containerStyle} container>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {textFields.map((tfProps, index) => {
            const { name } = tfProps;
            return (
              // ! messages[name] only exists if there's an error for that field
              // BUG: spreading tfProps here will cause refKey to fire a prop name error within MUI
              <Grid item key={index}>
                <TextField
                  error={messages && typeof messages[name] === "string"}
                  fullWidth
                  inputProps={{ "data-testid": `input-field-${index}` }}
                  inputRef={refs && refs[tfProps.refKey]}
                  label={tfProps.label}
                  name={tfProps.name}
                  onChange={props.handleChange}
                  size="large"
                  type={tfProps.type}
                  variant="outlined"
                />
                {
                  <Box py={1}>
                    <ValidationMessage color="error" align="right">
                      <span data-testid={`validation-message-${index}`}>
                        {(messages && messages[name]) || (
                          <React.Fragment>&nbsp;</React.Fragment>
                        )}
                      </span>
                    </ValidationMessage>
                  </Box>
                }
              </Grid>
            );
          })}
          <Grid item>
            <SubmitButton type="submit" {...buttons.submit}>
              {buttons.submit.text}
            </SubmitButton>
          </Grid>
          <Grid item>
            <Button type="reset" onClick={handleReset} {...buttons.reset}>
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

const ValidationMessage = styled(Typography)(() => ({
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
      type: PropTypes.string.isRequired,
      //** A unique value to use as a key for a ref */
      refKey: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  // ** Validation message { [fieldname]: "message" } || undefined */
  messages: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string.isRequired])
  ),
  // ** Use this for onChange validation - use the refs too*/
  handleChange: PropTypes.func,
  // ** It should reset the form and validation messages */
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // ** Use to pass MUI props. Overriding any of these means you have to specify the full object */
  buttons: PropTypes.shape({
    // No point in defining these as they are passed to MUI - it can handle types
    submit: PropTypes.object,
    reset: PropTypes.object
  }),
  //** The style element for the container - defaults to 'width: "320px"' */
  containerStyle: PropTypes.object,
  refs: PropTypes.object
};

Form.defaultProps = {
  containerStyle: {
    width: "320px"
  },
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
