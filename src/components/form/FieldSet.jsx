import React from "react";
import PropTypes from "prop-types";

export const FieldSet = props => (
  <fieldset>
    <legend>{props.legend}</legend>
    {props.children}
  </fieldset>
);

FieldSet.propTypes = {
  legend: PropTypes.string
};
