import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Stack, Toolbar } from "@mui/material";

import Rooms from "../pages/Rooms";
import RoomAdd from "../pages/RoomAdd";
import Room from "../pages/Room";
import RoomEdit from "../pages/RoomEdit";

import Adddevices from "../pages/Deviceadd";

import Relay3ChannelsEdit from "../pages/Relay3ChannelsEdit";
import SensorEdit from "../pages/SensorEdit";
import RelayAdeedit from "../pages/RelayAdeedit";

import AdeRelayChart from "./Chart/AderelayChart";
import SensorChart from "./Chart/SensorChart";
import Sensorhistory from "./Chart/SensorHistory";

import Alldevice from "./alldevice/Alldevice";

import BuildingSetting from "../pages/BuildingSetting";

import Adehistory from "./Chart/Adehistory";
import DeviceSence from "../pages/DeviceSence";
import Relay3channelSence from "../pages/Relay3ChannelSence";

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

        <Route path="EditRelayAde/:deviceId" element={<RelayAdeedit />} />
        <Route path="EditSensor/:deviceId" element={<SensorEdit />} />
        <Route
          path="EditRelay3channels/:deviceId"
          element={<Relay3ChannelsEdit />}
        />

        <Route path="Ade/:deviceId" element={<AdeRelayChart />} />
        <Route path="Sensor/:deviceId" element={<SensorChart />} />
        <Route path="Sensorhistory/:deviceId" element={<Sensorhistory />} />

        <Route path="building-setting" element={<BuildingSetting />} />

        <Route path="*" element={<Navigate to="/room" />} />
        <Route path="historty/:deviceId" element={<Adehistory />} />
        <Route path="Alldevice" element={<Alldevice />} />
        <Route path="Sence/:deviceId" element={<DeviceSence />} />
        <Route
          path="Relay3channelSence/:deviceId"
          element={<Relay3channelSence />}
        />
        <Route path="Adddevice" element={<Adddevices />} />
      </Routes>
    </Stack>
  );
}
