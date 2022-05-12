import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { deleteRoomById, updateRoomById } from "../api";

export default function RoomEditDialog({
  open,
  handleClose,
  room = { name: "" },
}) {
  // using = is: default value

  // using nameField instead of name, to remind can edit...
  const [nameField, setNameField] = React.useState(room.name);
  function handleChangeNameField(event) {
    setNameField(event.target.value);
  }
  let navigate = useNavigate();
  async function handleSave() {
    await updateRoomById(room._id, { name: nameField });
    handleClose();
    navigate("/")
  }

  async function handleDelete() {
    await deleteRoomById(room._id);
    handleClose();
    navigate("/")
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Room</DialogTitle>
      <DialogContent>
        <DialogContentText>You can change room's name here.</DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={nameField}
          onChange={handleChangeNameField}
        />

        <DialogContentText>
          Room will be delete immediately after clicking the following button
        </DialogContentText>

        <Button onClick={handleDelete} color="error">
          Delete room
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
