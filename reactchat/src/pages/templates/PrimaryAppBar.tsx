import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  IconButton,
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";

const PrimaryAppBar = () => {
  const theme = useTheme();
  const [sideMenu, setSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen, sideMenu]);
  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  const list = () => (
    <Box
      sx={{ paddingTop: theme.primaryAppBar.height, minWidth: "200px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ExploreCategories />
    </Box>
  );

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
          color: theme.palette.text.primary,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={sideMenu}
          onClose={toggleDrawer(false)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {list()}
        </Drawer>
        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}
          >
            PledChat
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
