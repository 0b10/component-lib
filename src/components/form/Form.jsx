import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";

/**
 * A Form, with configurable fields, via the textFields prop.
 * The 'messages' prop must be in the form of { fieldname: message, fieldname2: message }
 */
export class Form extends PureComponent {
  render() {
    const { props } = this;
    return (
      <form onSubmit={props.handleSubmit}>
        {props.textFields.map((tfProps, index) => {
          const { name } = tfProps;
          const { messages } = props;
          return (
            <React.Fragment key={index}>
              <TextField variant="outlined" size="large" {...tfProps} />
              {
                <Box py={1}>
                  <ValidationMessage align="right">
                    {(messages && messages[name]) || (
                      <React.Fragment>&nbsp;</React.Fragment>
                    )}
                  </ValidationMessage>
                </Box>
              }
            </React.Fragment>
          );
        })}
        <Button type="submit">Submit</Button>
        <Button type="reset" onClick={props.handleReset}>
          Reset
        </Button>
      </form>
    );
  }
}

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
  handleSubmit: PropTypes.func.isRequired
};
