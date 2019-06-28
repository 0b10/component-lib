import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

// >>> COMPONENTS >>>
export class ThemeProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTheme = this.getTheme.bind(this);
  }

  getTheme() {
    const { theme } = this.props;
    if (typeof theme === "string") {
      return themes[theme];
    } else if (theme === "object") {
      return theme;
    } else {
      return themes.dark;
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={this.getTheme()}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

// >>> THEMES >>>
const globalFonts = ["Helvetica", "Arial", "sans-serif"].join(",");

export const themes = {
  dark: createMuiTheme({
    palette: {
      type: "dark"
    },
    typography: {
      fontFamily: globalFonts,
      h2: {
        fontSize: "2rem",
        fontWeight: 400,
        textTransform: "capitalize"
      },
      body2: {
        fontWeight: 100
      }
    }
  }),
  light: createMuiTheme({
    palette: {
      type: "light"
    },
    typography: {
      fontFamily: globalFonts,
      h2: {
        fontSize: "2rem",
        fontWeight: 400,
        textTransform: "capitalize"
      },
      body2: {
        fontWeight: 100
      }
    }
  })
};

// >>> PROPTYPES >>>
ThemeProvider.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
