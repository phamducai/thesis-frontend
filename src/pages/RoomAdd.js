import React, { useState } from "react";
import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { addRoom } from "../api";
import { useNavigate } from "react-router-dom";

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
    <Stack>
      <Typography variant="h4">Add Room</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Room Name</InputLabel>
        <Input
          onChange={onValueChange}
          name="name"
          value={room.name}
          id="my-input"
        />
        <FormControl>
          <Button variant="contained" color="primary" onClick={() => Add()}>
            Add Room
          </Button>
        </FormControl>
      </FormControl>
    </Stack>
  );
}
