import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Server } from "../../@types/server.d";
interface ServerChannelsProps {
  data: Server[];
}

const ServerChannels = (props: ServerChannelsProps) => {
  const { data } = props;
  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const server_name = data?.[0]?.name ?? "Server";
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
          top: 1,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {server_name}
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {data
          .flatMap((obj) => obj.channel_server)
          .map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              sx={{ display: "block", maxHeight: "40px" }}
              dense={true}
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
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
