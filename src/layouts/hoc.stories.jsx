import React from "react";
import { storiesOf } from "@storybook/react";
// 3rd Party
import { Paper, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { makeCentered } from "./hoc";

const title = "Layouts";

storiesOf(title, module).add("Centered HOC", () =>
  makeCentered(TestContent)({ text: "TEST!" })
);

const TestContent = props => (
  <Paper>
    <StyledTypography>{props.text}</StyledTypography>
  </Paper>
);

const StyledTypography = styled(Typography)({
  padding: "20px"
});
