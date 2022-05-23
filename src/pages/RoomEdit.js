import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Box,
  MenuItem,
} from "@mui/material";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateRoomById, getRoomById, getDevices } from "../api";

export default function RoomEdit() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { data: room } = useQuery(["room", roomId], () => getRoomById(roomId));
  const { data: relayAdes } = useQuery(
    ["RelayAde", { refRoom: roomId }],
    () =>
      getDevices({
        params: {
          type: "RelayAde",
          refRoom: roomId,
        },
      }),
    { initialData: [] }
  );

  const [update, setUpdate] = React.useState({ name: "", refRelayAde: "" });

  function handleChange(e) {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  }

  React.useEffect(() => {
    if (room)
      setUpdate({ name: room.name || "", refRelayAde: room.refRelayAde || "" });
  }, [room]);

  const queryClient = useQueryClient();
  const mutation = useMutation(updateRoomById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["room", roomId]);
      navigate("/room/" + roomId);
    },
  });
  function handleSave() {
    mutation.mutate({
      id: roomId,
      payload: update,
    });
  }

  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h4">Edit Room</Typography>

      <TextField
        name="name"
        label="Room Name"
        value={update.name}
        onChange={handleChange}
      />
      <TextField
        select
        label="Room main RelayAde"
        name="refRelayAde"
        value={update.refRelayAde}
        onChange={handleChange}
      >
        {relayAdes.map((relayAde) => (
          <MenuItem value={relayAde._id} key={relayAde._id}>
            {relayAde.name}
          </MenuItem>
        ))}
      </TextField>

      <Divider flexItem />

      <Box>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
