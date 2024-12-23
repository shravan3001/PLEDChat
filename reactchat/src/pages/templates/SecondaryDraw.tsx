import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

type SecondaryDrawProps = {
  children: React.ReactNode;
};

const SecondaryDraw = ({ children }: SecondaryDrawProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDraw.width}`,
        height: `calc(100vh - ${theme.primaryAppBar.height})`,
        mt: `${theme.primaryAppBar.height}`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};
export default SecondaryDraw;
