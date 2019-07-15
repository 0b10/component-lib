import React from "react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { DefaultLayout } from "./layouts";
import { Home } from "./pages";
import {
  ThemeProvider,
  navBarStubPropsFactory,
  sideMenuButtonStubPropsFactory
} from "./components";

const App = props => {
  return (
    <React.Fragment>
      <ThemeProvider>
        <CssBaseLine />
        <DefaultLayout
          sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
          navBarProps={navBarStubPropsFactory()}
          {...props.sideMenuButtonProps}
          {...props.navBarProps}
        >
          <Home />
        </DefaultLayout>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
