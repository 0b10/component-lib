// MUI Icons
import BlockIcon from "@material-ui/icons/Block";
import CancelPresentIcon from "@material-ui/icons/CancelPresentation";
import CreateIcon from "@material-ui/icons/Create";
import LoginIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MailIcon from "@material-ui/icons/Mail";
import RandomIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";

/**
 * Use in place of a getProfileDetails handler, this particular implmentation has a custom avatar
 * @returns { username, uri, avatarUri }
 */
export const getProfileDetailsWithAvatar = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUri: "https://img.icons8.com/ios/50/000000/javascript-logo-filled.png"
});

const getProfileDetails_ = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUrl: false
});

const accountActions_ = {
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
};

const settingsItem_ = {
  primaryText: "Settings",
  uri: "/settings",
  icon: SettingsIcon
};

const menuItems_ = [
  { primaryText: "Item One", uri: "/item1," },
  { primaryText: "Item Two", uri: "/item2," },
  { primaryText: "Item Three", uri: "/item3," },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5" }
];

/**
 * Menu items with custom icons set.
 * @returns { primaryText, uri, icon }
 */
export const menuItemsWithCustomIcons = [
  { primaryText: "Item One", uri: "/item1,", icon: MailIcon },
  { primaryText: "Item Two", uri: "/item2,", icon: BlockIcon },
  { primaryText: "Item Three", uri: "/item3,", icon: CreateIcon },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5", icon: RandomIcon }
];

/**
 * A settings item with custom icon set
 * @returns { primaryText, uri, icon }
 */
export const settingsItemWithCustomIcon = {
  primaryText: "Settings",
  uri: "/settings",
  icon: CancelPresentIcon
};

/**
 * A factory for producing SideMenuButton props - sensible defaults in place.
 * @param {function} handleItemClick - fn(uri) => undefined
 * @param {Object} menuItems - { primaryText, uri, icon } // icon is optional
 * @param {function} isAuthed - fn() => bool
 * @param {function} getProfileDetails = fn() => { username, url, avatar } // avatar is optional
 * @param {Object} accountActions - { login, logout } ...and for each: { primaryText, uri, icon }
 * @param {Object} settings - { primaryText, uri, icon }
 * @example fn(handleItemClick, menuItems, isAuthed, getProfleDetails, accountActions, settings)
 * @returns { handleItemClick, menuItems, isAuthed, getProfleDetails, accountActions, settings }
 */
export const sideMenuButtonStubPropsFactory = (
  handleItemClick = () => null,
  menuItems = menuItems_,
  isAuthed = () => true,
  getProfileDetails = getProfileDetails_,
  accountActions = accountActions_,
  settings = settingsItem_
) => ({
  handleItemClick,
  menuItems,
  isAuthed,
  getProfileDetails,
  accountActions,
  settings
});

/**
 * A factory for producing SideMenuButton props - sensible defaults in place.
 * @param {function} handleItemClick - fn(uri) => undefined
 * @param {Object} menuItems - { primaryText, uri, icon } // icon is optional
 * @param {function} isAuthed - fn() => bool
 * @param {function} getProfileDetails = fn() => { username, url, avatar } // avatar is optional
 * @param {Object} accountActions - { login, logout } ...and for each: { primaryText, uri, icon }
 * @param {Object} settings - { primaryText, uri, icon }
 * @param {function} closeMenu = fn(), when clicked, the menu should be closed. This is injected
 *  by a HOC typically. SideMenuButton for example, does just that. This isn't an endpoint typically
 *  exposed to the client.
 * @example fn(handleItemClick, menuItems, isAuthed, getProfleDetails, accountActions, settings)
 * @returns { handleItemClick, menuItems, isAuthed, getProfleDetails, accountActions, settings }
 */
export const sideMenuStubPropsFactory = (
  handleItemClick = () => null,
  menuItems = menuItems_,
  isAuthed = () => true,
  getProfileDetails = getProfileDetails_,
  accountActions = accountActions_,
  settings = settingsItem_,
  closeMenu = () => null
) => ({
  handleItemClick,
  menuItems,
  isAuthed,
  getProfileDetails,
  accountActions,
  settings,
  closeMenu
});
