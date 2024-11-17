import { Box, useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
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
      {children}
    </Box>
  );
};

export default Main;
