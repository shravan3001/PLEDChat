import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { Server } from "../../@types/server.d";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MEDIA_URL } from "../../config";

interface ServerChannelProps {
  data: Server[];
}

const MessageInterfaceChannel = (props: ServerChannelProps) => {
  const { data } = props;
  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const [sideMenu, setSideMenu] = useState(false);
  const channelName =
    data
      ?.find((server) => server.id === Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))
      ?.name || "Home";

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
      <ServerChannels data={data} />
    </Box>
  );
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: "30px", height: "30px" }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component={"div"}>
            {channelName}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { sx: "block", sm: "none" } }}>
            <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default MessageInterfaceChannel;
