import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  ListItemIcon,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { getDevices, deleteDeviceById } from "../api";


export default function AdeRoom() {
  const { roomId } = useParams();
  const { data: devices } = useQuery(
    "AdeRooms",
    () => getDevices({ params: { type: "AdeRoom", refRoom: roomId } }),
    { initialData: [] }
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("AdeRooms");
    },
  });
  
  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }

  return (
    <Table>
      <TableBody>
        {devices.map((device, indexxxx) => (
          <TableRow key={indexxxx}>
            <TableCell>{device.name}</TableCell>
            <TableCell>{device.attributes?.channels.vrms}</TableCell>
            <TableCell>{device.attributes?.channels.irms}</TableCell>
            <TableCell>{device.attributes?.channels.energy}</TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/Ade/${device._id}`}
              >
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
              </Button>
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
