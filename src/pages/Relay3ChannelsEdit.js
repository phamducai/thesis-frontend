import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { updateDeviceById } from "../api";
const initialValue = {
  name: "",
  refRoom: "",
  name1: "",
  name2: "",
};

export default function Relay3ChannelsEdit() {
  const [device, setDevice] = useState(initialValue);
  const { deviceId } = useParams();

  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("/room")
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error.message));
  }, []);

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
    console.log(device);
  };

  let navigate = useNavigate();

  const editDevice = async () => {
    // return console.log(device);
    await updateDeviceById(deviceId, device);

    navigate(`/room/${device.refRoom}`);
  };

  return (
    <Stack gap={2} sx={{ padding: 2 }}>
      <Typography variant="h4">Edit device</Typography>

      <TextField
        onChange={onValueChange}
        name="name"
        value={device?.name}
        aria-describedby="my-helper-text"
      />

      <TextField
        onChange={onValueChange}
        name="name1"
        value={device?.name1}
        aria-describedby="my-helper-text"
      />
      <TextField
        onChange={onValueChange}
        name="name2"
        value={device?.name2}
        aria-describedby="my-helper-text"
      />

      <FormControl fullWidth>
        <InputLabel id="refRoom">In Room</InputLabel>
        <Select
          labelId="refRoom"
          name="refRoom"
          label="In Room"
          value={device.refRoom}
          onChange={onValueChange}
        >
          {rooms.map((room) => (
            <MenuItem value={room._id} key={room._id}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={editDevice}>
        Save
      </Button>
    </Stack>
  );
}
