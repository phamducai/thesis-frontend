import React, { useState } from "react";
import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { addDevice } from "../api";
import { useNavigate } from "react-router-dom";

export default function Adddevices() {
  const initialValue = {
    name: "",
    name1: "",
    name2: "",
  };
  let navigate = useNavigate();
  const [device, setDevice] = useState(initialValue);
  const onValueChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const Add = async () => {
    await addDevice(device);
    navigate("/");
  };

  return (
    <Stack>
      <Typography variant="h4">Add device</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Device Name</InputLabel>
        <Input
          onChange={onValueChange}
          name="name"
          value={device.name}
          id="my-input"
        />
        <FormControl>
          <InputLabel htmlFor="my-input">Device Name1</InputLabel>
          <Input
            onChange={onValueChange}
            name="name"
            value={device.name1}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Device Name2</InputLabel>
          <Input
            onChange={onValueChange}
            name="name"
            value={device.name2}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={() => Add()}>
            Add device
          </Button>
        </FormControl>
      </FormControl>
    </Stack>
  );
}
