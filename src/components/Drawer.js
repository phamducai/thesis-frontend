import { Drawer as MuiDrawer, Toolbar, Divider, Box } from "@mui/material";

import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

import { Link as RouterLink } from "react-router-dom";

import { List, ListItemButton, ListItemText } from "@mui/material";

function ListItemLink({ sx, primary, to }) {
  return (
    <ListItemButton sx={sx} component={RouterLink} to={to}>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}
const drawer = (
  <div>
    <Toolbar></Toolbar>
    <Divider />

    <div>
      <List sx={{ bgcolor: "background.paper" }} component="nav">
        <ListItemLink to="/room" primary={"Home"} />
        <ListItemLink to="/Alldevice" primary={"Devices"} />
      </List>
    </div>
    <Divider />
    <Toolbar>
      <Card sx={{ height: 450 }}></Card>
      <Card sx={{ maxWidth: 1500, padding: 1 }}>
        <CardMedia
          component="img"
          height="180"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/800px-HCMUT_official_logo.png"
          alt="HCMUT"
        />
      </Card>
    </Toolbar>
  </div>
);

const drawerWidth = 240;

export default function Drawer({ mobileOpen, handleDrawerToggle }) {
  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <MuiDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </MuiDrawer>

      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </MuiDrawer>
    </Box>
  );
}
