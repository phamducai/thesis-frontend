import React from "react";
import RelayAdeNoRoom from "../components/DeviceNoRoom/AdeNoRoom";
import {
  Stack,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import { useNavigate } from "react-router-dom";
// import { addDevice } from "../api";

const SearchBar = (
  <Stack direction="row" padding={1} spacing={1}>
    <Box>
      <TextField
        placeholder="Search by room name"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
    <Box sx={{ flex: 1 }}></Box>

    <Button variant="outlined">Add Device</Button>
  </Stack>
);

function Devices() {
  // const navigate = useNavigate();

  // function add(device) {
  //   addDevice(device);
  //   navigate("/chart");
  // }
  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      {SearchBar}

      <Paper>
        <Typography>Relay ADE</Typography>
        <RelayAdeNoRoom />
      </Paper>
    </Stack>
  );
}

export default Devices;
