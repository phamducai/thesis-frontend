import React from "react";
import RelayAdeNoRoom from "./DeviceNoRoom/AdeNoRoom";
import { Stack, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDevice } from "../api";
function AllDevice() {
  const navigate = useNavigate();
  function add(device) {
    addDevice(device);
    navigate("/chart");
  }
  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Button color="primary" variant="contained" onClick={() => add()}>
        Add
      </Button>
      <Paper>
        <Typography>Relay ADE</Typography>
        <RelayAdeNoRoom />
      </Paper>
    </Stack>
  );
}

export default AllDevice;
