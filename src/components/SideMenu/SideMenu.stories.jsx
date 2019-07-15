import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
// MUI Components
import { SideMenu, SideMenuButton } from "./SideMenu";
import { ThemeProvider } from "../ThemeProvider";
import {
  getProfileDetailsWithAvatar,
  menuItemsWithCustomIcons,
  settingsItemWithCustomIcon,
  sideMenuButtonStubPropsFactory,
  sideMenuStubPropsFactory
} from "./__helpers__/stubs";

const collectionName = "SideMenu";

storiesOf(collectionName, module)
  .add("Logged in", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        isAuthed={() => true}
        open
      />
    </ThemeProvider>
  ))
  .add("Logged out", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        closeMenu={() => null}
        isAuthed={() => false}
        open
      />
    </ThemeProvider>
  ))
  .add("Custom icons", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        open
        menuItems={menuItemsWithCustomIcons}
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
          {...sideMenuButtonStubPropsFactory()}
          handleItemClick={action("handleClick")}
        />
      </ThemeProvider>
    );
  })
  .add("Avatar pic", () => {
    return (
      <ThemeProvider>
        <CssBaseLine />
        <SideMenu
          {...sideMenuStubPropsFactory()}
          handleItemClick={action("handleClick")}
          getProfileDetails={getProfileDetailsWithAvatar}
          open
        />
      </ThemeProvider>
    );
  })
  .add("Light theme", () => (
    <ThemeProvider theme="light">
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        open
      />
    </ThemeProvider>
  ))
  .add("Dark theme", () => (
    <ThemeProvider theme="dark">
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        open
      />
    </ThemeProvider>
  ))
  .add("Default theme", () => (
    <ThemeProvider>
      <CssBaseLine />
      <SideMenu
        {...sideMenuStubPropsFactory()}
        handleItemClick={action("handleClick")}
        open
      />
    </ThemeProvider>
  ));
