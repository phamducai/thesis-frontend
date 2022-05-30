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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import RoomNameTableCell from "../RoomNameTableCell";
import { getDevices, deleteDeviceById } from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Relay3channelcomponent() {
  const { data: devices } = useQuery(
    "Relay3Channe",
    () => getDevices({ params: { type: "Relay3Channel" } }),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("Relay3Channe");
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
                    to={`/EditRelay3channels/${device._id}`}
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
