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
import { getDevices, deleteDeviceById, sendCommand } from "../api";
import { useContextEngine } from "../lib/context-engine";

export default function RelayAde() {
  const { roomId } = useParams();

  const { data: devices } = useQuery(
    "RelayAdes",
    () => getDevices({ params: { type: "RelayAde", refRoom: roomId } }),
    { initialData: [] }
  );
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("RelayAdes");
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
              <RealtimeStatusButton deviceId={device._id} field="status" />
            </TableCell>

            <TableCell>
              <RealtimeMetric deviceId={device._id} attr="vrms" /> V
            </TableCell>
            <TableCell>
              <RealtimeMetric deviceId={device._id} attr="irms" /> A
            </TableCell>
            <TableCell>
              <RealtimeMetric deviceId={device._id} attr="power" /> KW
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
                History device
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function RealtimeMetric({ deviceId, attr }) {
  const { data } = useContextEngine(`telemetry.${deviceId}.${attr}`, {
    initialData: {
      value: 0,
      timestamp: new Date(),
    },
  });

  return data.value;
}

function RealtimeStatusButton({ deviceId, field }) {
  const { data } = useContextEngine(`telemetry.${deviceId}.${field}`, {
    initialData: {
      value: "OFF",
    },
  });

  function handleClick() {
    sendCommand(deviceId, { [field]: data.value === "OFF" ? "ON" : "OFF" });
  }

  const color = data.value === "OFF" ? "error" : "primary";

  return (
    <Button variant="contained" onClick={handleClick} color={color}>
      {data.value}
    </Button>
  );
}
