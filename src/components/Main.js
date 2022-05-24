import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Stack, Toolbar } from "@mui/material";

import Rooms from "../pages/Rooms";
import RoomAdd from "../pages/RoomAdd";
import Room from "../pages/Room";
import RoomEdit from "../pages/RoomEdit";

import DeviceEdit from "../pages/DeviceEdit";
import Devices from "../pages/Devices";
import AdeRelayChart from "./Chart/AderelayChart";
import SensorChart from "./Chart/SensorChart";
import Relay3ChannelsEdit from "../pages/Relay3ChannelsEdit";

import AdeChart from "./Chart/AdeChart";

import BuildingSetting from "../pages/BuildingSetting";
import BuildingChart from "../pages/BuildingChart";

import Adehistory from "./Chart/Adehistory";

const drawerWidth = 240;

export default function Main() {
  return (
    <Stack
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />

      <Routes>
        <Route path="/" element={<Navigate to="/room" />} />

        <Route path="room">
          <Route index element={<Rooms />} />
          <Route path=":roomId" element={<Room />} />
          <Route path=":roomId/edit" element={<RoomEdit />} />
          <Route path="add" element={<RoomAdd />} />
        </Route>

        <Route path="device">
          <Route index element={<Devices />} />
          <Route path=":deviceId" element={<DeviceEdit />} />
        </Route>

        <Route path="Ade/:deviceId" element={<AdeRelayChart />} />
        <Route path="Sensor/:deviceId" element={<SensorChart />} />
        <Route
          path="Relay3ChannelsEdit/:deviceId"
          element={<Relay3ChannelsEdit />}
        />
        <Route path="building-setting" element={<BuildingSetting />} />
        <Route path="building-chart" element={<BuildingChart />} />
        <Route path="Adechart/:deviceId" element={<AdeChart />} />

        <Route path="*" element={<Navigate to="/room" />} />
        <Route path="historty/:deviceId" element={<Adehistory />} />
      </Routes>
    </Stack>
  );
}
