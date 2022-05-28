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
  return (
    <Stack
      sx={{
        height: 1,
        bgcolor: "background.default",
        overflow: "auto",
        padding: 2,
      }}
    >
      <Typography align="center">{room?.name}</Typography>
      <Paper>
        <AdeRoom />
      </Paper>
      <Paper>
        <RelayAde />
      </Paper>

      <Paper>
        <Sensor />
      </Paper>

      <Paper>
        <Relay3Channels />
      </Paper>
    </Stack>
  );
}
