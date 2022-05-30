import React, { useState } from "react";
import { Stack, Typography, Button, TextField } from "@mui/material";
import { addDevice } from "../api";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

const initialValue = {
  name: "",
  name1: "",
  name2: "",
  type: "",
  dev_addr: "",
};

export default function Adddevices() {
  let navigate = useNavigate();
  const [device, setDevice] = useState(initialValue);
  const onValueChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const Add = async () => {
    await addDevice(device);
    navigate("/Alldevice");
  };

  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Typography variant="h4">Edit device</Typography>

      <TextField
        onChange={onValueChange}
        name="name"
        label="name"
        value={device?.name}
        variant="filled"
        aria-describedby="my-helper-text"
      />

      <TextField
        onChange={onValueChange}
        name="name1"
        label="name1"
        value={device?.name1}
        variant="filled"
        aria-describedby="my-helper-text"
      />
      <TextField
        onChange={onValueChange}
        name="name2"
        label="name2"
        value={device?.name2}
        variant="filled"
        aria-describedby="my-helper-text"
      />
      <TextField
        onChange={onValueChange}
        name="type"
        label="type"
        value={device?.type}
        variant="filled"
        aria-describedby="my-helper-text"
      />
      <TextField
        onChange={onValueChange}
        name="dev_addr"
        label="dev_addr"
        value={device?.dev_addr}
        variant="filled"
        aria-describedby="my-helper-text"
      />

      <Button variant="contained" color="primary" onClick={Add}>
        <SaveIcon /> Save
      </Button>
    </Stack>
  );
}
