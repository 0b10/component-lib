import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { TextField, Button } from "@material-ui/core";

export class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    console.log({ value: target.test.value });
  }

  render() {
    const { props } = this;
    return (
      <form onSubmit={this.handleSubmit}>
        {props.textFields.map((tfProps, index) => (
          <TextField key={index} variant="outlined" size="large" {...tfProps} />
        ))}
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
    );
  }
}

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
  ).isRequired
};
