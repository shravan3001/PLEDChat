import { Box, Drawer, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import DrawerToggle from "../../components/PrimaryDraw/DrawToggle";

const PrimaryDraw = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");
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
          <DrawerToggle />
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
