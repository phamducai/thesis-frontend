import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams } from "react-router-dom";

import {
  Stack,
  Button,
  Box,
  TextField,
  InputAdornment,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import RoomNameTableCell from "../RoomNameTableCell";
import { getDevices, deleteDeviceById, sendAddDeviceCommand } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Alldevice() {
  const { deviceId } = useParams();

  const { data: devices } = useQuery(
    "devicess",
    () => getDevices(deviceId, "devicess"),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("devicess");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }
  const SearchBar = (
    <Stack direction="row" padding={1} spacing={1}>
      <Box>
        <TextField
          placeholder="Search by room name"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}></Box>

      <Button variant="contained" onClick={sendAddDeviceCommand}>
        Add Device
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={sendAddDeviceCommand}
      >
        Add Demo
      </Button>
    </Stack>
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
      {SearchBar}

      <Table>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>name1</TableCell>
          <TableCell>Name2</TableCell>
          <TableCell>Device Type </TableCell>
          <TableCell>ROOM</TableCell>
          <TableCell>ACTION</TableCell>
        </TableHead>
        <TableBody>
          {devices.map((device, index) => (
            <TableRow key={index}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device?.name1}</TableCell>
              <TableCell>{device?.name2}</TableCell>
              <TableCell>{device?.type}</TableCell>
              <RoomNameTableCell roomId={device?.refRoom} />
              <TableCell>
                <Button
                  color="secondary"
                  variant="contained"
                  component={Link}
                  to={`/Edit/${device._id}`}
                >
                  {" "}
                  <SettingsIcon />
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(device._id)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}
