import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDeviceById } from "../../api";
import { Typography, Divider } from "@mui/material";
import SenTemp from "./Adehistorycomponent/SenTemp";
import SenHumidity from "./Adehistorycomponent/SenHumidity";
import SenAirquality from "./Adehistorycomponent/SenAirqualty";

function Sensorhistory() {
  const { deviceId } = useParams();
  const { data: device } = useQuery(["devicessssss", deviceId], () =>
    getDeviceById(deviceId)
  );

  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        {device?.name}
      </Typography>
      <SenTemp />
      <Divider />
      <SenHumidity />
      <Divider />
      <SenAirquality />
    </React.Fragment>
  );
}

export default Sensorhistory;
