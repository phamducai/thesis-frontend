import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

import HistoryIcon from "@mui/icons-material/History";
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
            <TableCell sx={{ width: 324 }}>{device.name}</TableCell>

            <TableCell sx={{ width: 94 }}>
              <RealtimeVoltage deviceId={device._id} attr="vrms" /> V
            </TableCell>
            <TableCell sx={{ width: 94 }}>
              <RealtimeVoltage deviceId={device._id} attr="irms" /> A
            </TableCell>
            <TableCell sx={{ width: 260 }}>
              <RealtimeVoltage deviceId={device._id} attr="energy" /> KW
            </TableCell>

            <TableCell>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/Ade/${device._id}`}
              >
                <VisibilityIcon />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/device/${device._id}/edit`}
              >
                <SettingsIcon />
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(device.dev_addr)}
              >
                <DeleteIcon />
              </Button>
              <Button
                color="inherit"
                variant="contained"
                component={Link}
                to={`/historty/${device._id}`}
              >
                <HistoryIcon />
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
