import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { TextField, Button, Typography } from "@material-ui/core";

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
                <Typography>
                  {(messages && messages[name]) || (
                    <React.Fragment>&nbsp;</React.Fragment>
                  )}
                </Typography>
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

/**
 * A validation HOC that is decoupled from any lower level validator implementaion.
 */
export const withValidation = validator => WrappedForm => {
  class Validation extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { valid: false };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getFieldNames = this.getFieldNames.bind(this);
      this.getFieldValues = this.getFieldValues.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    getFieldNames(target) {
      const names = [];
      target.forEach(element => {
        // Should iterate over elements only
        element.nodeName === "INPUT" &&
          element.name &&
          names.push(element.name.toLowerCase());
      });
      return Object.freeze(names);
    }

    getFieldValues(keys, target) {
      const values = {};
      keys.forEach(key => (values[key] = target[key].value));
      return Object.freeze(values);
    }

    handleReset() {
      this.setState({ valid: false, messages: undefined });
    }

    async handleSubmit(event) {
      event.preventDefault();
      const names = this.getFieldNames(event.target);
      const values = this.getFieldValues(names, event.target);
      console.info("validating:", values);
      let result = await this.props.validate(values);
      console.info("RESULT:", result);

      result.valid
        ? this.setState({ valid: true, messages: undefined })
        : this.setState({ valid: false, messages: result });

      console.info("STATE", this.state);
    }

    render() {
      const { props } = this;
      return (
        <WrappedForm
          {...props.form}
          handleSubmit={this.handleSubmit}
          messages={this.state.messages}
          handleReset={this.handleReset}
        />
      );
    }
  }

  Validation.propTypes = {
    //** See Form propTypes */
    form: PropTypes.object.isRequired,
    //** Validator, must return { valid: bool, [ fieldName: "message", ... ]} */
    validate: PropTypes.func.isRequired
  };

  return Validation;
};

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
  validate: PropTypes.func.isRequired,
  // ** Validation message { [fieldname]: "message" } || undefined */
  message: PropTypes.objectOf(PropTypes.string.isRequired),
  // ** It should reset the form and validation messages */
  handleReset: PropTypes.func.isRequired
};
