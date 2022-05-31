import React from "react";
import AdeRelayChartVrms from "./Aderelaychartcomponent/AderelayChart.Vrms";
import AdeRelayChartIrms from "./Aderelaychartcomponent/AderelayChart.Irms";
import AdeRelayChartPower from "./Aderelaychartcomponent/AderelayChart.power";
import { getDeviceById, getRoomById } from "../../api";

import { Typography, Divider } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function AdeRelayChart() {
  const { deviceId } = useParams();
  const { data: device } = useQuery(["devicesssas", deviceId], () =>
    getDeviceById(deviceId)
  );
  const roomId = device?.refRoom;
  const { data: room } = useQuery(["roomsNames", roomId], () =>
    getRoomById(roomId)
  );

  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        {room?.name}
      </Typography>
      <Typography variant="h4" align="center">
        {device?.name}
      </Typography>
      <AdeRelayChartVrms />
      <Divider />
      <AdeRelayChartIrms />
      <Divider />
      <AdeRelayChartPower />
    </React.Fragment>
  );
}

export default AdeRelayChart;
