import React from "react";

import { Stack, Paper, Typography } from "@mui/material";

import RelayAde from "../components/RelayAde";
import Sensor from "../components/Sensor";
import Relay3Channels from "../components/Relay3Channels";

export default function Rooms() {
  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Paper>
        <Typography>Relay ADE</Typography>
        <RelayAde />
      </Paper>

      <Paper>
        <Typography>Sensor</Typography>
        <Sensor />
      </Paper>

      <Paper>
        <Typography>Relay 3 Channels</Typography>
        <Relay3Channels />
      </Paper>
    </Stack>
  );
}
