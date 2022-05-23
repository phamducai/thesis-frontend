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
            <TableCell>{device.name}</TableCell>

            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="temp" />
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="humidity" />
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="airquality" />
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/Sensor/${device._id}`}
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
function RealtimeVoltage({ deviceId, attr }) {
  const { data } = useContextEngine(`telemetry.${deviceId}.${attr}`, {
    initialData: {
      value: 0,
      timestamp: new Date(),
    },
  });

  return data.value;
}
