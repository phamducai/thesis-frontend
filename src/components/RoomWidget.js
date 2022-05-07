import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import RoomEditDialog from "./RoomEditDialog";

export default function RoomWidget({ room }) {
  const { name, _id } = room;

  const [editOpen, setEditOpen] = useState(false);
  function handleClickEdit() {
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" component={Link} to={`/room/${_id}`}>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/room/${_id}`}>
          View
        </Button>
        <Button size="small" onClick={handleClickEdit}>
          Edit
        </Button>
      </CardActions>

      <RoomEditDialog
        open={editOpen}
        handleClose={handleEditClose}
        room={room}
      />
    </Card>
  );
}
