import React from "react";
import PropTypes from "prop-types";

export const FieldSet = props => (
  <fieldset style={props.styles.fieldset}>
    <legend style={props.styles.legend}>{props.legend}</legend>
    {props.children}
  </fieldset>
);

FieldSet.propTypes = {
  //** The legend text */
  legend: PropTypes.string,
  styles: PropTypes.shape({
    fieldset: PropTypes.object,
    legend: PropTypes.object
  })
};

FieldSet.defaultProps = {
  styles: {
    fieldset: {
      padding: "50px",
      borderRadius: "4px",
      borderWidth: "1px"
    }
  }
};
