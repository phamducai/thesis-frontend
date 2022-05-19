import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DraftsIcon from "@mui/icons-material/Drafts";

import Rooms from "./pages/Rooms";
import Devices from "./pages/Devices";
import DeviceEdit from "./pages/DeviceEdit";
import AllDevice from "./components/AllDevice";
import AdeRelayChart from "./components/Chart/AderelayChart";
import SensorChart from "./components/Chart/SensorChart";
import Relay3ChannelsEdit from "./pages/Relay3ChannelsEdit";
import HeadAdeedit from "./pages/HeadAdeedit";
import AdeChart from "./components/Chart/AdeChart";
import AddNewroom from "./components/AddRoom";

import { getAuthStatus } from "./api";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";

function App() {
  const navigate = useNavigate();
  const { data: user, status } = useQuery("user", getAuthStatus);
  if (status === "loading")
    return <Stack sx={{ minHeight: "100vh" }}>Checking if logged in</Stack>;

  if (status === "error")
    return <Stack sx={{ minHeight: "100vh" }}>Server Error</Stack>;

  if (!user)
    return (
      <Stack
        sx={{ minHeight: "100vh" }}
        alignItems="center"
        justifyContent="center"
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Stack gap={2}>
            <LoginForm />
          </Stack>
        </Paper>
      </Stack>
    );
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            sss Admin
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <Stack sx={{ width: "300px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/home")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/allDevice")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="All Device" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="home" exact element={<Rooms />} />
            <Route path="room/:roomId" element={<Devices />} />
            <Route path="device/:deviceId" element={<DeviceEdit />} />

            <Route path="Ade/:deviceId" element={<AdeRelayChart />} />
            <Route path="Sensor/:deviceId" element={<SensorChart />} />
            <Route
              path="Relay3ChannelsEdit/:deviceId"
              element={<Relay3ChannelsEdit />}
            />
            <Route path="HeadAdeedit/:deviceId" element={<HeadAdeedit />} />
            <Route path="Adechart/:deviceId" element={<AdeChart />} />

            <Route path="allDevice" element={<AllDevice />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="AddRoom" element={<AddNewroom />} />
          </Routes>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
