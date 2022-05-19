import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, Stack, MenuItem } from "@mui/material";

import { updateDeviceById, getRooms, getDeviceById } from "../api";
import { useQuery } from "react-query";

export default function DeviceEdit() {
  const { deviceId } = useParams();

  const { data: device } = useQuery(["device", deviceId], () =>
    getDeviceById(deviceId)
  );
  const { data: rooms } = useQuery("rooms", getRooms, { initialData: [] });

  const [update, setUpdate] = useState({ name: "", refRoom: "" });

  const onValueChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleSave = async () => {
    await updateDeviceById(deviceId, update);

    navigate(`/room/${update.refRoom}`);
  };

  useEffect(() => {
    if (device) setUpdate({ name: device.name, refRoom: device.refRoom || "" });
  }, [device]);

  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Typography variant="h4">Edit device</Typography>

      <TextField
        label="Name"
        name="name"
        value={update.name}
        onChange={onValueChange}
      />

      <TextField
        select
        name="refRoom"
        label="In Room"
        value={update.refRoom}
        onChange={onValueChange}
        helperText="Select room to move this device to"
      >
        {rooms.map((room) => (
          <MenuItem value={room._id} key={room._id}>
            {room.name}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Stack>
  );
}
