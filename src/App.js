import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import {
  // Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DraftsIcon from "@mui/icons-material/Drafts";

import Rooms from "./pages/Rooms";
import Devices from "./pages/Devices";
import Test from "./pages/Test";
import DeviceEdit from "./pages/DeviceEdit";
import Chart from "./components/Chart";
import AdeRelayChart from "./components/Chart/AderelayChart";
import SensorChart from "./components/Chart/SensorChart";

function App() {
  const navigate = useNavigate();

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
            News
          </Typography>
          <Button color="inherit">Login</Button>
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
              <ListItemButton onClick={() => navigate("/chart")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="home" element={<Rooms />} />
            <Route path="test/:deviceId" element={<Test />} />
            <Route path="Ade/:deviceId" element={<AdeRelayChart />} />
            <Route path="Sensor/:deviceId" element={<SensorChart />} />
            <Route path="chart" element={<Chart />} />
            <Route path="room/:roomId" element={<Devices />} />
            <Route path="device/:deviceId" element={<DeviceEdit />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
