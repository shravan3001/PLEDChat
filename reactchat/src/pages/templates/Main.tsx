import { Box, Typography, useTheme } from "@mui/material";

const Main = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: `${theme.primaryAppBar.height}`,
        height: `calc(100vh - ${theme.primaryAppBar.height})`,
        overflowY: "auto",
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

export default Main;
