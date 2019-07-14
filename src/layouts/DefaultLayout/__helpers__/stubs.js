// MUI Icons
import BlockIcon from "@material-ui/icons/Block";
import CancelPresentIcon from "@material-ui/icons/CancelPresentation";
import CreateIcon from "@material-ui/icons/Create";
import LoginIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MailIcon from "@material-ui/icons/Mail";
import RandomIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
// MUI Components

export const getProfileDetailsWithAvatar = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUri: "https://img.icons8.com/ios/50/000000/javascript-logo-filled.png"
});

export const getProfileDetails = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUrl: false
});

export const accountActions = {
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

export const settingsItem = {
  primaryText: "Settings",
  uri: "/settings",
  icon: SettingsIcon
};

export const menuItems = [
  { primaryText: "Item One", uri: "/item1," },
  { primaryText: "Item Two", uri: "/item2," },
  { primaryText: "Item Three", uri: "/item3," },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5" }
];

export const menuItemsWithCustomIcons = [
  { primaryText: "Item One", uri: "/item1,", icon: MailIcon },
  { primaryText: "Item Two", uri: "/item2,", icon: BlockIcon },
  { primaryText: "Item Three", uri: "/item3,", icon: CreateIcon },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5", icon: RandomIcon }
];

export const settingsItemWithCustomIcon = {
  primaryText: "Settings",
  uri: "/settings",
  icon: CancelPresentIcon
};

// >>> SideMenuButton >>>
export const sideMenuButtonProps = {
  handleItemClick: () => null,
  menuItems: menuItemsWithCustomIcons,
  isAuthed: () => true,
  getProfileDetails,
  accountActions,
  settings: settingsItemWithCustomIcon
};

// >>> NavBar >>>
export const navItems = [
  { label: "one", uri: "#" },
  { label: "two", uri: "#" },
  { label: "three", uri: "#" }
];

export const navBarProps = {
  navItems,
  handleNavItemClick: () => null
  // There should be menuButton here too, but this is overridden in DefaultLayout where it's used
  // Feel free to add it, as it won't affect that component.
};

// >>> DefaultLayout >>>
export const defaultLayoutProps = {
  sideMenuButtonProps,
  navBarProps
};
