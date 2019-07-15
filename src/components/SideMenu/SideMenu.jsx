import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { styled } from "@material-ui/styles";

import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/CloseRounded";
import LinkIcon from "@material-ui/icons/Link";
import LoginIcon from "@material-ui/icons/AccountBoxSharp";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";

export class SideMenuButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({ open: true });
  }

  closeMenu() {
    this.setState({ open: false });
  }

  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        <IconButton onClick={this.openMenu}>
          <MenuIcon />
        </IconButton>
        <SideMenu {...props} open={state.open} closeMenu={this.closeMenu} />
      </React.Fragment>
    );
  }
}

export class SideMenu extends PureComponent {
  render() {
    const { props } = this;
    const authed = props.isAuthed();

    return (
      <React.Fragment>
        <Drawer
          anchor="right"
          open={props.open}
          variant="temporary"
          onClose={props.closeMenu}
        >
          <List component="nav">
            <Authed authed={authed}>
              <ProfileAvatar
                handleItemClick={props.handleItemClick}
                getProfileDetails={props.getProfileDetails}
              />
              <Divider />
            </Authed>
            <div id="sideMenuItems">
              {props.menuItems.map((config, index) => (
                <MenuItem
                  key={index}
                  handleItemClick={props.handleItemClick}
                  {...config}
                />
              ))}
            </div>
            <Divider />
            <MenuItem
              id="sideMenuSettings"
              handleItemClick={props.handleItemClick}
              {...props.settings}
            />
            <AccountAction
              handleItemClick={props.handleItemClick}
              authed={authed}
              accountActions={props.accountActions}
            />
            <Divider />
            <CloseMenu handleItemClick={props.closeMenu} />
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

// display children if authed
export const Authed = props => {
  return props.authed ? props.children : null;
};

export const ProfileAvatar = props => {
  const { avatarUri, uri, username } = props.getProfileDetails();

  // Catch undefined, because proptypes can't
  if (typeof uri === undefined || typeof username === undefined)
    throw Error("The ProfileAvatar uri or username is undefined");

  return (
    <ListItem button onClick={() => props.handleItemClick(uri)}>
      <ListItemAvatar>
        {avatarUri ? (
          <Avatar src={avatarUri} />
        ) : (
          <Avatar>{username.slice(0, 1)}</Avatar>
        )}
      </ListItemAvatar>
      <ListItemText primary={username} />
    </ListItem>
  );
};

// stateful login / logout
export const AccountAction = props => {
  const { login, logout } = props.accountActions;
  let config = undefined;

  if (props.authed) {
    config = {
      primaryText: logout.primaryText || "Logout",
      icon: logout.icon || LogoutIcon,
      handleItemClick: props.handleItemClick,
      uri: logout.uri
    };
  } else {
    config = {
      primaryText: login.primaryText || "Login",
      icon: login.icon || LoginIcon,
      handleItemClick: props.handleItemClick,
      uri: login.uri
    };
  }

  return <MenuItem {...config} />;
};

// Typical menu items
export class MenuItem extends PureComponent {
  render() {
    const { props } = this;
    const Icon = props.icon || LinkIcon;

    return (
      <StyledListItem button onClick={() => props.handleItemClick(props.uri)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={props.primaryText} />
      </StyledListItem>
    );
  }
}

// Close menu
// Don't use MenuItem, because it has invariants about props, this component breaks them.
export const CloseMenu = props => {
  return (
    <StyledListItem button onClick={props.handleItemClick}>
      <ListItemIcon>
        <CloseIcon />
      </ListItemIcon>
      <ListItemText primary="Close Menu" />
    </StyledListItem>
  );
};

// >>> STYLES >>>
// FIXME: make parent use 100% width at xs breakpoint, also set max width.
// This will need to be set on the parent element.
// Prevent this menu overflowing the viewport on small screens.
const StyledListItem = styled(ListItem)({
  minWidth: "300px",
  paddingRight: "70px;"
});

// >>> PROPTYPES >>>
// ~~~ Authed ~~~
// **ide a component if not authenticated.
Authed.propTypes = {
  // ** Control whether children are displayed */
  authed: PropTypes.bool.isRequired
};

// ~~~ SideMenu ~~~
// ** A drawer that opens from the right
SideMenu.propTypes = {
  // ** Optionally whether the drawer is open or not. */
  open: PropTypes.bool,
  // ** The callback fired when menu items are clicked. It is passed a URI. */
  handleItemClick: PropTypes.func.isRequired,
  /** Get various pices of account information. Must return an object that includes the account name
   * and the URI that points to the user's profile.
   */
  getProfileDetails: PropTypes.func.isRequired,
  /** An array of objects that describe menu items. These items are the primary buttons located just
   *  below the avatar. The URI is passed into the clock handler when an item is clicked.
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string.isRequired,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object
    }).isRequired
  ).isRequired,
  /** An object that contains the neccessary information to create the settings button. The URI is
   * passed into the click handler when a button is clicked.
   */
  settings: PropTypes.shape({
    // ** The displayed text. */
    primaryText: PropTypes.string.isRequired,
    // ** The URI passed into the click handler. Use it to route */
    uri: PropTypes.string.isRequired,
    // ** A Material UI icon component */
    icon: PropTypes.object.isRequired
  }).isRequired,
  /** An object of objects that describe he login/logout button. The only property that is mandatory
   *  is the uri - which is the same URI passed into the click handler when the button is clicked.
   */
  accountActions: PropTypes.shape({
    // ** Details relating to the login button. */
    login: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object,
      // ** The callback fired when menu items are clicked. It is passed a URI. */
      handleItemClick: PropTypes.func
    }).isRequired,
    // ** Details relating to the logout button. */
    logout: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object,
      // ** The callback fired when menu items are clicked. It is passed a URI. */
      handleItemClick: PropTypes.func
    }).isRequired
  }).isRequired,
  /** State for opening and closing the drawer is held externally. Pass in a function that
   * manages that state. Opening and closing the drawer is managed with prop.open, but when
   * the CloseButton is clicked, that state needs to be sent to an external component. This
   * function should take no args, and serves only one purpose.
   */
  closeMenu: PropTypes.func.isRequired
};

// ~~~ Profile Avatar ~~~
// ** Display the profile avatar at the top of the side menu.
ProfileAvatar.propTypes = {
  /** Get various pices of account information. Must return an object that includes the account
   * username avatar URI (optional), and the URI that points to the user's profile.
   */
  getProfileDetails: PropTypes.func.isRequired,
  // ** The callback fired when menu items are clicked. It is passed a URI. */
  handleItemClick: PropTypes.func.isRequired
};

// ~~~ AccountAction ~~~
// ** A responsive login/logout button (responds to authentication status).
AccountAction.propTypes = {
  /** An object of objects that describe he login/logout button. The only property that is mandatory
   *  is the uri - which is the same URI passed into the click handler when the button is clicked.
   */
  accountActions: PropTypes.shape({
    // ** Details relating to the login button. */
    login: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object
    }).isRequired,
    // ** Details relating to the logout button. */
    logout: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object
    }).isRequired
  }).isRequired,
  // ** Control whether children are displayed */
  authed: PropTypes.bool,
  // ** The callback fired when menu items are clicked. It is passed a URI. */
  handleItemClick: PropTypes.func.isRequired
};

// ~~~ MenuItem ~~~
// ** A ginle menu item.
MenuItem.propTypes = {
  // ** The displayed text. */
  primaryText: PropTypes.string.isRequired,
  // ** The URI passed into the click handler. Use it to route */
  uri: PropTypes.string.isRequired,
  // ** A Material UI icon component */
  icon: PropTypes.object,
  // ** The callback fired when menu items are clicked. It is passed a URI. */
  handleItemClick: PropTypes.func.isRequired
};

// ~~~ SideMenuButton ~~~
// ** A Hamburger menu button that opens the SideMenu.
SideMenuButton.propTypes = {
  // ** The callback fired when menu items are clicked. It is passed a URI. */
  handleItemClick: PropTypes.func.isRequired,
  /** Get various pices of account information. Must return an object that includes the account name
   * and the URI that points to the user's profile.
   */
  getProfileDetails: PropTypes.func.isRequired,
  /** An array of objects that describe menu items. These items are the primary buttons located just
   *  below the avatar. The URI is passed into the clock handler when an item is clicked.
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string.isRequired,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object
    }).isRequired
  ).isRequired,

  /** An object that contains the neccessary information to create the settings button. The URI is
   * passed into the click handler when a button is clicked.
   */
  settings: PropTypes.shape({
    // ** The displayed text. */
    primaryText: PropTypes.string.isRequired,
    // ** The URI passed into the click handler. Use it to route */
    uri: PropTypes.string.isRequired,
    // ** A Material UI icon component */
    icon: PropTypes.object.isRequired
  }).isRequired,

  /**
   * An object of objects that describe he login/logout button. The only property that is mandatory
   * is the uri - which is the same URI passed into the click handler when the button is clicked.
   */
  accountActions: PropTypes.shape({
    // ** Details relating to the login button. */
    login: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object,
      // ** The callback fired when menu items are clicked. It is passed a URI. */
      handleItemClick: PropTypes.func
    }).isRequired,
    // ** Details relating to the logout button. */
    logout: PropTypes.shape({
      // ** The displayed text. */
      primaryText: PropTypes.string,
      // ** The URI passed into the click handler. Use it to route */
      uri: PropTypes.string.isRequired,
      // ** A Material UI icon component */
      icon: PropTypes.object,
      // ** The callback fired when menu items are clicked. It is passed a URI. */
      handleItemClick: PropTypes.func
    }).isRequired
  }).isRequired
};
