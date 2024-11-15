import { Box, Typography, useMediaQuery, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";

const PrimaryDraw = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");

  const openedMixin = () => ({
    transitions: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closeMixin = () => ({
    transitions: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDraw.closedWidth,
  });

  const Drawer = styled(
    MuiDrawer,
    {},
  )(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    sx: open ? openedMixin() : closeMixin(),
  }));

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: theme.primaryAppBar.height,
          height: `calc(100vh - ${theme.primaryAppBar.height})`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawerToggle
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
          {Array.from({ length: 100 }).map((_, index) => (
            <Typography key={index} component="p">
              {index + 1}
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};
export default PrimaryDraw;
