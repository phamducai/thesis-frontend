import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useQuery } from "react-query";
import { getAuthStatus } from "../api";

import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

export default function Header({ handleDrawerToggle }) {
  const { data: user } = useQuery("user", getAuthStatus);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.username}
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
