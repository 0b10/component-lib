import React from "react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { DefaultLayout, stubs } from "./layouts";
import { Home } from "./pages";
import { ThemeProvider } from "./components";

const App = props => {
  return (
    <React.Fragment>
      <ThemeProvider>
        <CssBaseLine />
        <DefaultLayout
          sideMenuButtonProps={stubs.defaultLayout.sideMenuButtonProps}
          navBarProps={stubs.defaultLayout.navBarProps}
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
