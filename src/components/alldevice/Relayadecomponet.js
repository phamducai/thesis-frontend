import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link } from "react-router-dom";

import {
  Stack,
  Button,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import RoomNameTableCell from "../RoomNameTableCell";
import { getDevices, deleteDeviceById } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Relayadecomponet() {
  const { data: devices } = useQuery(
    "RelayAdess",
    () => getDevices({ params: { type: "RelayAde" } }),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("RelayAdess");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }
  return (
    <React.Fragment>
      <Stack
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Name1</TableCell>
            <TableCell>Name2</TableCell>
            <TableCell>Device Type </TableCell>
            <TableCell>ROOM</TableCell>
            <TableCell>ACTION</TableCell>
          </TableHead>
          <TableBody>
            {devices.map((device, index) => (
              <TableRow key={index}>
                <TableCell>{device.name}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{device?.type}</TableCell>
                <RoomNameTableCell roomId={device?.refRoom} />
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to={`/EditRelayAde/${device._id}`}
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
    </React.Fragment>
  );
}
