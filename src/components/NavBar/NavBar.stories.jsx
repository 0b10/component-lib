import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import CssBaseLine from "@material-ui/core/CssBaseline";

// Icons
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { NavBar } from "./NavBar";
import { ThemeProvider } from "../ThemeProvider";

storiesOf("NavBar", module).add("Typical state", () => (
  <ThemeProvider>
    <CssBaseLine />
    <NavBar
      navItems={mockNavItems}
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

const mockNavItems = [
  { label: "Label One", uri: "/label/one" },
  { label: "Label Two", uri: "/label/two" },
  { label: "Label Three", uri: "/label/three" }
];
