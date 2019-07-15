import React from "react";
// 3rd party
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// Local
import { NavBar } from "./NavBar";
import { ThemeProvider } from "../ThemeProvider";
import { navBarStubPropsFactory } from "./__helpers__/stubs";

storiesOf("NavBar", module).add("Typical state", () => (
  <ThemeProvider>
    <CssBaseLine />
    <NavBar
      navItems={navBarStubPropsFactory().navItems}
      handleNavItemClick={action("handleTagClick")}
      menuButton={
        <IconButton
          onClick={action(
            "Clicked, but see SideMenu component for implementation"
          )}
        >
          <MenuIcon />
        </IconButton>
      }
    />
  </ThemeProvider>
));
