import { colors, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    primaryAppBar: {
      height: 50,
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
  return theme;
};
export default createMuiTheme;
