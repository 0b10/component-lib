import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// 3rd party
import { Box } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
// Local
import { NavBar, SideMenuButton } from "../../components";

export class DefaultLayout extends PureComponent {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <NavBar
          {...navBarDefaultProps}
          {...props.navBarProps}
          menuButton={
            <SideMenuButton
              {...sideMenuButtonDefaultProps}
              {...props.sideMenuButtonProps}
            />
          }
        />
        <Box>{props.children}</Box>
      </React.Fragment>
    );
  }
}

// >>> DEFAULTS >>>
// Set statically defined component values, however, these can be overriden via props.
const navBarDefaultProps = {
  navItems: [
    { label: "one", uri: "#" },
    { label: "two", uri: "#" },
    { label: "three", uri: "#" }
  ]
  // Ignore menuButton, override it
};

const sideMenuButtonDefaultProps = {
  menuItems: [
    { primaryText: "Item One", uri: "/item1," },
    { primaryText: "Item Two", uri: "/item2," },
    { primaryText: "Item Three", uri: "/item3," },
    { primaryText: "Item Four", uri: "/item4" },
    { primaryText: "Item Five", uri: "/item5" }
  ],
  accountActions: {
    login: {
      primaryText: "Login",
      uri: "/login",
      icon: LoginIcon
    },
    logout: {
      primaryText: "Logout",
      uri: "/logout",
      icon: LogoutIcon
    }
  },
  settings: {
    primaryText: "Settings",
    uri: "/settings",
    icon: SettingsIcon
  }
};

// >>> PROPTYPES >>>
//** Not all props are specified here (only required props), see sub-components for the rest. */
DefaultLayout.propTypes = {
  // ** Pass through props to NavBar */
  navBarProps: PropTypes.shape({
    handleNavItemClick: PropTypes.func.isRequired
  }).isRequired,
  //** SideMenuButton props */
  sideMenuButtonProps: PropTypes.shape({
    handleItemClick: PropTypes.func.isRequired,
    isAuthed: PropTypes.func.isRequired,
    getProfileDetails: PropTypes.func.isRequired
  }).isRequired
};
