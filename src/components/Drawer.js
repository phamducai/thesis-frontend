import { Drawer as MuiDrawer, Toolbar, Divider, Box } from "@mui/material";

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
        <ListItemLink to="/room" primary={"Rooms"} />
        <ListItemLink to="/Alldevice" primary={"Alldevice"} />
      </List>
    </div>
  </div>
);

const drawerWidth = 240;

export default function Drawer({ mobileOpen, handleDrawerToggle }) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
