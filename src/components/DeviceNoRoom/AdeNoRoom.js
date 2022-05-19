import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";

import RoomNameTableCell from "../RoomNameTableCell";
import { getDevices, deleteDeviceById } from "../../api";

export default function RelayAdeNoRoom() {
  const { deviceId } = useParams();

  const { data: devices } = useQuery(
    "device",
    () => getDevices(deviceId, "device"),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("device");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }

  return (
    <Table>
      <TableBody>
        {devices.map((device, index) => (
          <TableRow key={index}>
            <TableCell>{device.name} </TableCell>
            <TableCell>{device?.name1}</TableCell>
            <TableCell>{device?.name2}</TableCell>
            <TableCell>{device?.type}</TableCell>
            <RoomNameTableCell roomId={device?.refRoom} />

            <TableCell>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/device/${device._id}`}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(device._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
