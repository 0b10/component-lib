import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/**
 * A validation HOC that is decoupled from any lower level validator implementaion.
 * @arg {string} validator - A validation function that accepts an object of field names
 *  e.g. { fieldName: value }.  Must return { valid: bool, [ fieldName: "message", ... ]}, where
 *  upon validation error, a set of keys, defined by field names, reference a validation message.
 */
export const withValidation = validator => WrappedForm => {
  class Validation extends PureComponent {
    constructor(props) {
      super(props);

      // Build input element references with textFields.refKey as key
      const refs = {};
      props.form.textFields.forEach(
        ({ refKey }) => (refs[refKey] = React.createRef())
      );

      this.state = {
        valid: false,
        refs // Refs are initially undefined in the child when set as instance var here - not good.
      };

      this.getFieldValues = this.getFieldValues.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setValidity = this.setValidity.bind(this);
    }

    getFieldValues() {
      const { state } = this;

      // Get field values from refs, produce: values = { fieldName: value, ... }
      const values = {};
      for (let key in state.refs) {
        const name = state.refs[key].current.name;
        values[name] = state.refs[key].current.value;
      }
      return values;
    }

    setValidity(validationResult) {
      validationResult.valid
        ? this.setState({ valid: true, messages: undefined })
        : this.setState({ valid: false, messages: validationResult });
    }

    handleReset() {
      this.setState({ valid: false, messages: undefined });
    }

    async handleChange() {
      this.setValidity(await validator(this.getFieldValues()));
    }

    async handleSubmit(event) {
      event.preventDefault();
      this.setValidity(await validator(this.getFieldValues()));
    }

    render() {
      const { props } = this;
      return (
        <WrappedForm
          {...props.form}
          handleSubmit={this.handleSubmit}
          messages={this.state.messages}
          handleReset={this.handleReset}
          handleChange={this.handleChange}
          refs={this.state.refs}
        />
      );
    }
  }

  Validation.propTypes = {
    //** See Form propTypes */
    form: PropTypes.object.isRequired
  };

  return Validation;
};
