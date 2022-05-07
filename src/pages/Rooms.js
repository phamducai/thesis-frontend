import React, { useState, useEffect } from "react";
import axios from "axios";

import { Stack, Grid } from "@mui/material";

import RoomWidget from "../components/RoomWidget";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();

    // eslint-disable-next-line
  }, []);
  async function getRooms() {
    const { data } = await axios.get("/room");
    console.log(data);
    setRooms(data);
  }
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
