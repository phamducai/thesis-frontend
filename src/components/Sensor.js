import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { getDevices, deleteDeviceById } from "../api";
import { useContextEngine } from "../lib/context-engine";
import HistoryIcon from "@mui/icons-material/History";

export default function Sensor() {
  const { roomId } = useParams();
  const { data: devices } = useQuery(
    "Sensors",
    () => getDevices({ params: { type: "Sensor", refRoom: roomId } }),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("Sensors");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }

  return (
    <Table>
      <TableBody>
        {devices.map((device, indexx) => (
          <TableRow key={indexx}>
            <TableCell sx={{ width: 324 }}>{device.name}</TableCell>

            <TableCell sx={{ width: 94 }}>
              <RealtimeVoltage deviceId={device._id} attr="temp" /> °C
            </TableCell>
            <TableCell sx={{ width: 96 }}>
              <RealtimeVoltage deviceId={device._id} attr="humidity" /> %RH
            </TableCell>
            <TableCell sx={{ width: 258 }}>
              <RealtimeVoltage deviceId={device._id} attr="airquality" /> ppm
            </TableCell>

            <TableCell>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/Sensor/${device._id}`}
              >
                <VisibilityIcon />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/EditSensor/${device._id}`}
              >
                <SettingsIcon />
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(device._id)}
              >
                <DeleteIcon />
              </Button>
              <Button
                color="inherit"
                variant="contained"
                component={Link}
                to={`/Sensorhistory/${device._id}`}
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
