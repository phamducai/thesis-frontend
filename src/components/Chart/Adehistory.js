import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDeviceById, getRoomById } from "../../api";
import { Typography, Divider } from "@mui/material";
import AdeVrms from "./Adehistorycomponent/AdeVrms";
import AdeIrms from "./Adehistorycomponent/AdeIrms";
import AdePower from "./Adehistorycomponent/AdePower";

function Adehistory() {
  const { deviceId } = useParams();

  const { data: device } = useQuery(["devicessssss", deviceId], () =>
    getDeviceById(deviceId)
  );
  const roomId = device?.refRoom;
  const { data: room } = useQuery(["roomNames", roomId], () =>
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
      <AdeVrms />
      <Divider />
      <AdeIrms />
      <Divider />
      <AdePower />
    </React.Fragment>
  );
}

export default Adehistory;
