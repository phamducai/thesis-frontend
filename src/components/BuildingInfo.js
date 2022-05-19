import React from "react";
import { useQuery } from "react-query";
import { Stack, Typography, Paper, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import { useContextEngine } from "../lib/context-engine";
import { getDeviceById, getBuilding } from "../api";
import tienDien from "./tienDien";
import { useNavigate } from "react-router-dom";

export default function BuildingInfo() {
  const navigate = useNavigate();

  const { data: building } = useQuery("building", getBuilding);

  const deviceId = building?.refRelayAde;

  const { data: relayAde } = useQuery(
    "building.refRelayAde",
    () => getDeviceById(deviceId),
    {
      enabled: Boolean(deviceId),
    }
  );

  return (
    <Paper>
      <Stack padding={2} spacing={2}>
        <Stack direction="row">
          <Typography variant="h4" flexGrow={1} align="center">
            Building Information
          </Typography>

          <IconButton
            aria-label="delete"
            onClick={() => navigate("/building-chart")}
          >
            <ShowChartIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => navigate("/building-setting")}
          >
            <SettingsIcon />
          </IconButton>
        </Stack>

        <Stack direction="row" gap={2}>
          <Stack flexGrow={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Home Name</Typography>
              <Typography>{relayAde?.name || "--"}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Dien Ap</Typography>
              <Typography>{relayAde?.attributes?.vrms || "--"} V</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Dong dien</Typography>
              <Typography>
                {building ? (
                  <RealtimeVoltage
                    deviceId={building.refRelayAde}
                    attr="irms"
                  />
                ) : null}{" "}
                A
              </Typography>
            </Stack>
          </Stack>

          <Stack flexGrow={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Tieu thu</Typography>
              <Typography>
                {building ? (
                  <RealtimeVoltage
                    deviceId={building.refRelayAde}
                    attr="energy"
                  />
                ) : null}{" "}
                KW
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Tien Dien</Typography>
              <Typography>
                {tienDien(relayAde?.attributes?.energy) * 1.1} VND
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Dien Ap Realtime</Typography>
              <Typography>
                {building ? (
                  <RealtimeVoltage
                    deviceId={building.refRelayAde}
                    attr="vrms"
                  />
                ) : null}
                V
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
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
