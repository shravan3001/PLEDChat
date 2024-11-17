import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/Avatar";
import { useParams, Link } from "react-router-dom";
import useCrud from "../../hooks/useCrud";
import { MEDIA_URL } from "../../config";
import { useEffect } from "react";

interface Server {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  banner: string;
}

const ExloreServers = () => {
  const { categoryName } = useParams();
  const url = categoryName
    ? `/server/select/?category=${categoryName}`
    : "/server/select/";
  const { fetchData, dataCRUD, error, isLoading } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6 }}>
          <Typography
            variant="h3"
            noWrap
            component={"h1"}
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                letterSpacing: "-2px",
                textTransform: "capitalize",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName ? categoryName : "Popular Channels"}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            noWrap
            component={"h2"}
            //color="text.secondary"
            sx={{
              display: {
                sm: "block",
                fontWeight: 500,
                letterSpacing: "-1px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName
              ? `Channels talking about ${categoryName}`
              : "Check out some of our popular channels"}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}
        >
          Recommended Channels
        </Typography>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          {dataCRUD.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  backgroundImage: "none",
                }}
              >
                <Link
                  to={`/server/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    image={
                      item.banner
                        ? `${MEDIA_URL}${item.banner}`
                        : "https://source.unsplash.com/random/"
                    }
                    alt="random"
                    sx={{
                      display: { sx: "none", sm: "block" },
                      objectFit: "cover",
                      height: 140,
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 0,
                      "&:last-child": { paddingBottom: 0 },
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <ListItemAvatar sx={{ minWidth: "50px" }}>
                            <Avatar
                              alt="Server Icon"
                              src={`${MEDIA_URL}${item.icon}`}
                            />
                          </ListItemAvatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              textAlign={"start"}
                              sx={{
                                fontWeight: 700,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2">
                              {item.category}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ExloreServers;
