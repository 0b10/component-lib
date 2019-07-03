import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { styled } from "@material-ui/styles";

import { AppBar, Grid, Hidden, Tab, Tabs } from "@material-ui/core";

export class NavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { highlightedTab: 0 };
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
  }

  handleNavItemClick(uri, highlightedTab) {
    this.setState({ highlightedTab });
    this.props.handleNavItemClick(uri);
  }

  render() {
    const { navItems, menuButton, width } = this.props;
    return (
      <AppBar>
        <Grid container direction="row">
          <Hidden only="xs" width={width}>
            <Grid item container direction="row" justify="flex-start" sm={11}>
              <Tabs value={this.state.highlightedTab}>
                {navItems.map(({ label, uri }, index) => (
                  <StyledTab
                    label={label}
                    key={index}
                    onClick={() => this.handleNavItemClick(uri, index)}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item container direction="row" justify="flex-end" sm={1}>
              {menuButton}
            </Grid>
          </Hidden>
        </Grid>
      </AppBar>
    );
  }
}

const StyledTab = styled(Tab)({
  height: "70px"
});

NavBar.propTypes = {
  /**
   * For testing. Set the active width of the screen - use an MUI breakpoint symbol.
   */
  width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  handleNavItemClick: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  menuButton: PropTypes.object.isRequired
};
