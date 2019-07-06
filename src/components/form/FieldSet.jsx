import React from "react";
import PropTypes from "prop-types";

export const FieldSet = props => (
  <fieldset style={(props.styles && props.styles.fieldset) || styles.fieldset}>
    <legend style={(props.style && props.styles.legend) || styles.legend}>
      {props.legend}
    </legend>
    {props.children}
  </fieldset>
);

// FIXME: determine how to use the global theme.
const styles = {
  fieldset: {
    padding: "50px",
    borderRadius: "4px"
  },
  legend: undefined
};

FieldSet.propTypes = {
  //** The legend text */
  legend: PropTypes.string,
  styles: PropTypes.shape({
    fieldset: PropTypes.object,
    legend: PropTypes.object
  })
};
