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

export default function Sensorcomponenent() {
  const { data: devices } = useQuery(
    "Senso",
    () => getDevices({ params: { type: "Sensor" } }),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("Senso");
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
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{device?.type}</TableCell>
                <TableCell></TableCell>
                <RoomNameTableCell roomId={device?.refRoom} />
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to={`/EditSensor/${device._id}`}
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
