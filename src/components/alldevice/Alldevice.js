import React from "react";

import { Link } from "react-router-dom";

import {
  Stack,
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
  Divider,
} from "@mui/material";

import { sendAddDeviceCommand } from "../../api";

import Relayadecomponet from "./Relayadecomponet";
import Sensorcomponenent from "./Sensorcomponent";
import Relay3channelcomponent from "./Relay3channelcomponent";

export default function Alldevice() {
  const SearchBar = (
    <Stack direction="row" padding={1} spacing={1}>
      <Box>
        <TextField
          placeholder="Search by room name"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                onClick={sendAddDeviceCommand}
              ></InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}></Box>
      <Button variant="contained" onClick={sendAddDeviceCommand}>
        Add Device
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to={"/Adddevice"}
      >
        Add Demo
      </Button>
    </Stack>
  );

  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        Devices
      </Typography>
      <Stack
        sx={{
          bgcolor: "background.default",
          overflow: "auto",
        }}
      >
        {SearchBar}
        <Relayadecomponet />
        <Divider />
        <Sensorcomponenent />
        <Divider />
        <Relay3channelcomponent />
      </Stack>
    </React.Fragment>
  );
}
