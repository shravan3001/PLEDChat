import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  ListItemIcon,
  Typography,
} from "@mui/material";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListItemAvatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ServerChannels = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { fetchData, dataCRUD, error, isLoading } = useCrud<Category>(
    [],
    "/server/category/",
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography>Explore</Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {dataCRUD.map((item) => (
          <ListItem
            disablePadding
            key={item.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: 0 }}>
                    <img
                      alt="server icon"
                      src={`${MEDIA_URL}${item.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "block",
                        margin: "auto",
                        filter: isDarkMode ? "invert(100%)" : "none", // works well with svg images
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      textAlign={"left"}
                      paddingLeft={1}
                    >
                      {item.name}
                    </Typography>
                  }
                ></ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ServerChannels;
