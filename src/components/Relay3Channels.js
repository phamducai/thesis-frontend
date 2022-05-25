import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Switch,
} from "@mui/material";

import {
  getDevices,
  deleteDeviceById,
  updateDeviceStatusById,
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
  let navigate = useNavigate();
  function handleUpdata1(deviceData) {
    deviceData.status1
      ? (deviceData.status1 = false)
      : (deviceData.status1 = true);
    updateDeviceStatusById(deviceData);
    navigate("/room/" + roomId);
  }
  function handleUpdata2(deviceData) {
    deviceData.status2
      ? (deviceData.status2 = false)
      : (deviceData.status2 = true);
    updateDeviceStatusById(deviceData);
    navigate("/room/" + roomId);
  }
  function handleUpdata3(deviceData) {
    deviceData.status3
      ? (deviceData.status3 = false)
      : (deviceData.status3 = true);
    updateDeviceStatusById(deviceData);
    navigate("/room/" + roomId);
  }
  console.log(devices);
  return (
    <Table>
      <TableBody>
        {devices.map((device, index) => (
          <TableRow key={index}>
            <TableCell>{device.name}</TableCell>

            <TableCell>
              <RealtimeStatusButton deviceId={device._id} field="status1" />
            </TableCell>

            <TableCell>{device?.name1}</TableCell>
            <TableCell>
              <RealtimeStatusButton deviceId={device._id} field="status2" />
            </TableCell>
            <TableCell>{device?.name2}</TableCell>
            <TableCell>
              <RealtimeStatusButton deviceId={device._id} field="status3" />
            </TableCell>
            <TableCell>
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to={`/Relay3ChannelsEdit/${device._id}`}
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
