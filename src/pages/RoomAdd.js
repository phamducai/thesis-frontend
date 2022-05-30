import React, { useState } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { addRoom } from "../api";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

export default function AddRoom() {
  const initialValue = {
    name: "",
  };
  let navigate = useNavigate();
  const [room, setRoom] = useState(initialValue);
  const onValueChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const Add = async () => {
    await addRoom(room);
    navigate("/");
  };

  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Typography variant="h4">Add Room</Typography>

      <TextField
        onChange={onValueChange}
        name="name"
        value={room?.name}
        aria-describedby="my-helper-text"
        label="name"
        variant="filled"
      />
      <Button variant="contained" color="primary" onClick={Add}>
        <SaveIcon /> Save
      </Button>
    </Stack>
  );
}
