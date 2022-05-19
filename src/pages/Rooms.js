import React from "react";
import { getRooms } from "../api";
import { useQuery } from "react-query";

import { Stack, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import RoomWidget from "../components/RoomWidget";

import HeadAde from "../components/HeadAde";

export default function Rooms() {
  const { data: rooms } = useQuery("Rooms", getRooms, { initialData: [] });
  const navigate = useNavigate();

  return (
    <Stack>
      <Stack sx={{ height: "200px", bgcolor: "white" }}>
        <HeadAde />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/AddRoom")}
      >
        Add
      </Button>
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
