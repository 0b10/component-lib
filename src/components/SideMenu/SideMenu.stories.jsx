import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
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
import { SideMenu, SideMenuButton } from "./SideMenu";
import { ThemeProvider } from "../ThemeProvider";

const componentName = "SideMenu";

storiesOf(componentName, module)
  .add("Logged in", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItems}
        isAuthed={() => true}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItem}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ))
  .add("Logged out", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItems}
        isAuthed={() => false}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItem}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ))
  .add("Custom icons", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItemsWithCustomIcons}
        isAuthed={() => true}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItemWithCustomIcon}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ))
  .add("Closable", () => {
    return (
      <ThemeProvider>
        <CssBaseLine />
        <SideMenuButton
          handleItemClick={action("handleClick")}
          menuItems={menuItemsWithCustomIcons}
          isAuthed={() => true}
          getProfileDetails={getProfileDetails}
          accountActions={accountActions}
          settings={settingsItemWithCustomIcon}
        />
      </ThemeProvider>
    );
  })
  .add("Avatar pic", () => {
    return (
      <ThemeProvider>
        <CssBaseLine />
        <SideMenu
          open
          handleItemClick={action("handleClick")}
          menuItems={menuItemsWithCustomIcons}
          isAuthed={() => true}
          getProfileDetails={getProfileDetailsWithAvatar}
          accountActions={accountActions}
          settings={settingsItemWithCustomIcon}
          closeMenu={() => null}
        />
      </ThemeProvider>
    );
  })
  .add("Light theme", () => (
    <ThemeProvider theme="light">
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItems}
        isAuthed={() => true}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItem}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ))
  .add("Dark theme", () => (
    <ThemeProvider theme="dark">
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItems}
        isAuthed={() => true}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItem}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ))
  .add("Default theme", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        open
        handleItemClick={action("handleClick")}
        menuItems={menuItems}
        isAuthed={() => true}
        getProfileDetails={getProfileDetails}
        accountActions={accountActions}
        settings={settingsItem}
        closeMenu={() => null}
      />
    </ThemeProvider>
  ));

const getProfileDetailsWithAvatar = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUri: "https://img.icons8.com/ios/50/000000/javascript-logo-filled.png"
});

const getProfileDetails = () => ({
  username: "AProfileName",
  uri: "/my/profile",
  avatarUrl: false
});

const accountActions = {
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

const settingsItem = {
  primaryText: "Settings",
  uri: "/settings",
  icon: SettingsIcon
};

const menuItems = [
  { primaryText: "Item One", uri: "/item1," },
  { primaryText: "Item Two", uri: "/item2," },
  { primaryText: "Item Three", uri: "/item3," },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5" }
];

const menuItemsWithCustomIcons = [
  { primaryText: "Item One", uri: "/item1,", icon: MailIcon },
  { primaryText: "Item Two", uri: "/item2,", icon: BlockIcon },
  { primaryText: "Item Three", uri: "/item3,", icon: CreateIcon },
  { primaryText: "Item Four", uri: "/item4" },
  { primaryText: "Item Five", uri: "/item5", icon: RandomIcon }
];

const settingsItemWithCustomIcon = {
  primaryText: "Settings",
  uri: "/settings",
  icon: CancelPresentIcon
};
