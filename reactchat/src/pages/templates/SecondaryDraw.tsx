import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SecondaryDraw = () => {
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
      {Array.from({ length: 100 }).map((_, index) => (
        <Typography key={index} component="p">
          {index + 1}
        </Typography>
      ))}
    </Box>
  );
};
export default SecondaryDraw;
