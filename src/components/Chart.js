import React from "react";
import RelayAdeNoRoom from "./DeviceNoRoom/AdeNoRoom";
import { Stack, Paper, Typography } from "@mui/material";
function Chart() {
  
  return ( <Stack gap={2} sx={{ padding: 2 }}>
    <Paper>
      <Typography>Relay ADE</Typography>
      <RelayAdeNoRoom />
    </Paper>
  </Stack>
  
  )
}

export default Chart;
