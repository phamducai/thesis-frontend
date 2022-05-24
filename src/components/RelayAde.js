import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  ListItemIcon,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDevices, deleteDeviceById, updateDeviceStatusById } from "../api";
import { useContextEngine } from "../lib/context-engine";
export default function RelayAde() {
  let navigate = useNavigate();
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
  function handleUpdata(deviceData) {
    deviceData.status
      ? (deviceData.status = false)
      : (deviceData.status = true);
    updateDeviceStatusById(deviceData);
    navigate("/room/" + roomId);
  }
  return (
    <Table>
      <TableBody>
        {devices.map((device, indexx) => (
          <TableRow key={indexx}>
            <TableCell>{device.name}</TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  handleUpdata(device);
                }}
                color={device?.status ? "primary" : "error"}
              >
                {device?.status ? "ON" : "OFF"}
              </Button>
            </TableCell>

            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="vrms" /> V
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="irms" /> A
            </TableCell>
            <TableCell>
              <RealtimeVoltage deviceId={device._id} attr="power" /> KW
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
                to={`/device/${device._id}`}
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
function RealtimeVoltage({ deviceId, attr }) {
  const { data } = useContextEngine(`telemetry.${deviceId}.${attr}`, {
    initialData: {
      value: 0,
      timestamp: new Date(),
    },
  });

  return data.value;
}
