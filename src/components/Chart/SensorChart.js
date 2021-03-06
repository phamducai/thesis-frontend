import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDeviceById, getRoomById } from "../../api";
import SensorChartTemp from "./Aderelaychartcomponent/SensorChart.Temp";
import SensorChartHumidity from "./Aderelaychartcomponent/SensorChart.Humidity";
import SensorChartAirquality from "./Aderelaychartcomponent/SensorChart.Airquality";

import { Typography } from "@mui/material";

function SensorChart() {
  const { deviceId } = useParams();
  const { data: device } = useQuery(["devicessss", deviceId], () =>
    getDeviceById(deviceId)
  );
  const roomId = device?.refRoom;
  const { data: room } = useQuery(["roomNamess", roomId], () =>
    getRoomById(roomId)
  );
  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        {room?.name}
      </Typography>
      <Typography align="center" variant="h4">
        {" "}
        {device?.name}
      </Typography>
      <SensorChartTemp />
      <SensorChartHumidity />
      <SensorChartAirquality />
    </React.Fragment>
  );
}

export default SensorChart;
