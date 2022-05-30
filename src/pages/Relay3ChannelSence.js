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
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/lab";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox from "@mui/material/Checkbox";

export default function Relay3channelSence() {
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

  const { data: device } = useQuery(["devicesss", deviceId], () =>
    getDeviceById(deviceId)
  );
  const [state, setState] = useState(initialValue);

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeto, setSelectedTimeto] = useState(null);
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);

  function handlealert(deviceId) {
    sendCommand(deviceId, {
      timeOn: selectedTime && selectedTime.toLocaleTimeString(),
      timeOff: selectedTimeto && selectedTimeto.toLocaleTimeString(),
      weekday: state,
      channel1: status1,
      channel2: status2,
      channel3: status3,
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
  const handleStatus1 = () => setStatus1(!status1);
  const handleStatus2 = () => setStatus2(!status2);
  const handleStatus3 = () => setStatus3(!status3);
  return (
    <React.Fragment>
      <Typography align="center" variant="h4">
        {device?.name}
      </Typography>
      <Typography align="center" variant="h4">
        {device?.name1}
      </Typography>
      <Typography align="center" variant="h4">
        {device?.name2}
      </Typography>

      <Table>
        <TableBody>
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
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Timer</FormLabel>
                  <FormGroup row={true}>
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
                  <FormGroup row={true}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={status1}
                          onChange={handleStatus1}
                          name="status1"
                        />
                      }
                      label="Relay1"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={status2}
                          onChange={handleStatus2}
                          name="status2"
                        />
                      }
                      label="Relay2"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={status3}
                          onChange={handleStatus3}
                          name="status3"
                        />
                      }
                      label="Relay3"
                    />
                  </FormGroup>
                  <Button
                    onClick={() => handlealert(device._id)}
                    variant="contained"
                  >
                    {" "}
                    Save
                  </Button>
                </FormControl>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
