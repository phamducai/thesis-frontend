import React from "react";

import { Stack, Paper, Typography } from "@mui/material";

import RelayAde from "../components/RelayAde";
import Sensor from "../components/Sensor";
import Relay3Channels from "../components/Relay3Channels";
import AdeRoom from "../components/AdeRoom";
import { getRoomById } from "../api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function Room() {
  const { roomId } = useParams();
  const { data: room } = useQuery(["roName", roomId], () =>
    getRoomById(roomId)
  );
  console.log(room);
  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      <Paper>
        <Typography>Special RelayAde</Typography>
        <Typography>abc</Typography>
      </Paper>

      <Paper>
        <AdeRoom />
      </Paper>
      <Paper>
        <Typography>{room?.name}</Typography>
        <RelayAde />
      </Paper>

      <Paper>
        <Typography>Sensor</Typography>
        <Sensor />
      </Paper>

      <Paper>
        <Typography>Relay 3 Channels</Typography>
        <Relay3Channels />
      </Paper>
    </Stack>
  );
}
