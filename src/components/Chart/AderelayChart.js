import React from "react";
import AdeRelayChartVrms from "./Aderelaychartcomponent/AderelayChart.Vrms";
import AdeRelayChartIrms from "./Aderelaychartcomponent/AderelayChart.Irms";
import AdeRelayChartPower from "./Aderelaychartcomponent/AderelayChart.power";
import { getDeviceById } from "../../api";

import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function AdeRelayChart() {
  const { deviceId } = useParams();
  const { data: device } = useQuery(["devicesssas", deviceId], () =>
    getDeviceById(deviceId)
  );
  return (
    <React.Fragment>
      <Typography align="center">{device?.name}</Typography>
      <AdeRelayChartVrms />
      <AdeRelayChartIrms />
      <AdeRelayChartPower />
    </React.Fragment>
  );
}

export default AdeRelayChart;
