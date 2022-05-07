import React from "react";
import { getRooms } from "../api";
import { useQuery } from "react-query";

import { Stack, Grid } from "@mui/material";

import RoomWidget from "../components/RoomWidget";

export default function Rooms() {
  const { data: rooms } = useQuery("Rooms", getRooms, { initialData: [] });

  return (
    <Stack>
      <Stack sx={{ height: "200px", bgcolor: "gray" }}>BuildInfoing </Stack>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {rooms.map((room, index) => (
          <Grid item xs={3} key={index}>
            <RoomWidget room={room} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
