import { colors, createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: string;
    };
    primaryDraw: {
      width: string;
      closedWidth: string;
    };
    secondaryDraw: {
      width: string;
      closedWidth: string;
    };
  }
  interface ThemeOptions {
    primaryAppBar?: {
      height?: string;
    };
    primaryDraw?: {
      width?: string;
      closedWidth?: string;
    };
    secondaryDraw?: {
      width?: string;
      closedWidth?: string;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: {
        fontWeight: 500,
        letterSpacing: "-0.5px",
      },
    },

    primaryAppBar: {
      height: "50px",
    },
    primaryDraw: {
      width: "240px",
      closedWidth: "70px",
    },
    secondaryDraw: {
      width: "240px",
      closedWidth: "70px",
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
    },
    palette: {
      text: {
        primary: colors.common.black,
        secondary: colors.common.white,
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
export default createMuiTheme;
