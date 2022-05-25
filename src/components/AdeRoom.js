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
import { useContextEngine } from "../lib/context-engine";
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
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="vrms" />
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="irms" />
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="energy" />
            </TableCell>
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
                to={`/device/${device._id}/edit`}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(device.dev_addr)}
              >
                Delete
              </Button>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/historty/${device._id}`}
              >
                History Room
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function RealtimeVoltage({ deviceId, attr }) {
  const { data } = useContextEngine(`telemetry.${deviceId}.${attr}`, {
    initialData: {
      value: 0,
      timestamp: new Date(),
    },
  });
  return data.value;
}
