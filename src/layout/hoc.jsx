import React from "react";
// 3rd party
import { Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";

export const asCentered = WrappedComponent => {
  return props => (
    <StyledGrid container direction="row" justify="center" alignItems="center">
      <Grid item alignItems="center">
        <WrappedComponent {...props} />
      </Grid>
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  height: "100vh"
});
