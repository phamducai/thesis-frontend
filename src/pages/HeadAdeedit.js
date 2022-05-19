import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Stack } from "@mui/material";

import { updateDeviceById } from "../api";
const initialValue = {
  name: "",
};

export default function HeadAdeedit() {
  const [device, setDevice] = useState(initialValue);
  const deviceId = "6285d5c83d7f15cbc14c1106";
  useEffect(() => {
    async function getDevice() {
      const { data } = await axios.get(`/device/${deviceId}`);
      setDevice(data);
    }
    getDevice();

    // eslint-disable-next-line
  }, [deviceId]);

  const onValueChange = (e) => {
    console.log(e.target.value, e.target.name);
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const editDevice = async () => {
    // return console.log(device);
    await updateDeviceById(deviceId, device);

    navigate("/");
  };

  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Typography variant="h4">Edit device</Typography>

      <TextField
        onChange={onValueChange}
        name="name"
        value={device.name}
        aria-describedby="my-helper-text"
      />
      <Button variant="contained" color="primary" onClick={editDevice}>
        Save
      </Button>
    </Stack>
  );
}
