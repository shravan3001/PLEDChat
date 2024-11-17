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

export const createMuiTheme = (mode: "light" | "dark") => {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: {
        fontWeight: 500,
        fontSize: "15px",
        letterSpacing: "-0.5px",
      },
      body2: {
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
      mode,
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
export default createMuiTheme;
