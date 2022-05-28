import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams } from "react-router-dom";

import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  getDevices,
  deleteDeviceById,
  // updateDeviceStatusById,
  sendCommand,
} from "../api";
import { useContextEngine } from "../lib/context-engine";

export default function Relay3Channel() {
  const { roomId } = useParams();
  const { data: devices } = useQuery(
    "Relay3Channels",
    () => getDevices({ params: { type: "Relay3Channel", refRoom: roomId } }),
    { initialData: [] }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeviceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("Relay3Channels");
    },
  });

  function handleDelete(deviceId) {
    mutation.mutate(deviceId);
  }
  // let navigate = useNavigate();
  // function handleUpdata1(deviceData) {
  //   deviceData.status1
  //     ? (deviceData.status1 = false)
  //     : (deviceData.status1 = true);
  //   updateDeviceStatusById(deviceData);
  //   navigate("/room/" + roomId);
  // // }

  return (
    <Table>
      <TableBody>
        {devices.map((device, index) => (
          <TableRow key={index}>
            <TableCell>{device.name}</TableCell>

            <TableCell padding='none'>
              <RealtimeStatusButton deviceId={device._id} field="status1" />
            </TableCell>

            <TableCell>{device?.name1}</TableCell>
            <TableCell padding='none'>
              <RealtimeStatusButton deviceId={device._id} field="status2" />
            </TableCell>
            <TableCell>{device?.name2}</TableCell>
            <TableCell padding='none'>
              <RealtimeStatusButton deviceId={device._id} field="status3" />
            </TableCell>
            <TableCell>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/Edit/${device._id}`}
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
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
