import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { TextField } from "@material-ui/core";

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
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField variant="outlined" size="large" label="test" name="test" />
      </form>
    );
  }
}

Form.propTypes = {};
