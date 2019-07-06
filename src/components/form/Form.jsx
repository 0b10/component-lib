import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { TextField, Button } from "@material-ui/core";

export class Form extends PureComponent {
  render() {
    const { props } = this;
    return (
      <form onSubmit={props.handleSubmit}>
        {props.textFields.map((tfProps, index) => (
          <TextField key={index} variant="outlined" size="large" {...tfProps} />
        ))}
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
    );
  }
}

export const withValidation = validator => WrappedComponent =>
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getFieldNames = this.getFieldNames.bind(this);
      this.getFieldValues = this.getFieldValues.bind(this);
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

    async handleSubmit(event) {
      event.preventDefault();
      const names = this.getFieldNames(event.target);
      const values = this.getFieldValues(names, event.target);
      let result = await this.props.validate(values);
      console.log("result:", result);
    }

    render() {
      const { props } = this;
      return (
        <WrappedComponent {...props.form} handleSubmit={this.handleSubmit} />
      );
    }
  };

Form.propTypes = {
  //** An array of objects describing input fields */
  textFields: PropTypes.arrayOf(
    //** Override/set any MUI TextField props */
    PropTypes.shape({
      // ** html label */
      label: PropTypes.string.isRequired,
      //** html field name */
      name: PropTypes.string.isRequired,
      //** html input type: text, email, password etc */
      type: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  validate: PropTypes.func.isRequired
};
