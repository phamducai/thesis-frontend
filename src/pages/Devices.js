import React from "react";
import RelayAdeNoRoom from "../components/DeviceNoRoom/AdeNoRoom";
import {
  Stack,
  Paper,
  Button,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { addCommandDevice } from "../api";
function add() {
  addCommandDevice();
}

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

    <Button variant="outlined" onClick={add}>
      Add Device
    </Button>
  </Stack>
);

function Devices() {
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
        <RelayAdeNoRoom />
      </Paper>
    </Stack>
  );
}

export default Devices;
