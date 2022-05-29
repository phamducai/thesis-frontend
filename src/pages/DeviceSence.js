import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getDeviceById, sendCommand } from "../api";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Button,
  TextField,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { TimePicker } from "@mui/lab";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";

export default function DeviceSence() {
  const { deviceId } = useParams();
  const initialValue = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

  const { data: device } = useQuery(["devices", deviceId], () =>
    getDeviceById(deviceId)
  );
  const [state, setState] = useState(initialValue);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeto, setSelectedTimeto] = useState(null);

  function handlealert(deviceId) {
    sendCommand(deviceId, {
      selectedTime: selectedTime && selectedTime.toLocaleTimeString(),
      selectedTimeto: selectedTimeto && selectedTimeto.toLocaleTimeString(),
      state,
    });
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } =
    state;

  return (
    <Table>
      <TableBody>
        <TableHead>
          <TableCell align="center">{device?.name}</TableCell>
        </TableHead>
        <TableRow>
          {" "}
          <TableCell>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={4} sx={{ width: "250px" }}>
                <TimePicker
                  label="Device On"
                  value={selectedTime}
                  onChange={(newValue) => {
                    setSelectedTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </TableCell>
          <TableCell>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={4} sx={{ width: "250px" }}>
                <TimePicker
                  label="Device OFF"
                  value={selectedTimeto}
                  onChange={(newValue) => {
                    setSelectedTimeto(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </TableCell>
          <TableCell>
            <Button onClick={() => handlealert(device._id)} variant="contained">
              {" "}
              Save
            </Button>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex" }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Timer</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Monday}
                        onChange={handleChange}
                        name="Monday"
                      />
                    }
                    label="Monday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Tuesday}
                        onChange={handleChange}
                        name="Tuesday"
                      />
                    }
                    label="Tuesday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Wednesday}
                        onChange={handleChange}
                        name="Wednesday"
                      />
                    }
                    label="Wednesday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Thursday}
                        onChange={handleChange}
                        name="Thursday"
                      />
                    }
                    label="Thursday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Friday}
                        onChange={handleChange}
                        name="Friday"
                      />
                    }
                    label="Friday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Saturday}
                        onChange={handleChange}
                        name="Saturday"
                      />
                    }
                    label="Saturday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Sunday}
                        onChange={handleChange}
                        name="Sunday"
                      />
                    }
                    label="Sunday"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
