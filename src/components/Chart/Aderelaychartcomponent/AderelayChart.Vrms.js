import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function AdeRelayChartVrms() {
  const { deviceId } = useParams();
  const { data: vrms } = useContextEngine(`telemetry.${deviceId}.vrms`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [vrmsArray, setVrmsArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setVrmsArray([...vrmsArray.slice(1), vrms.value]);
    // eslint-disable-next-line
  }, [vrms]);
  const series = [
    {
      name: "Vrms",
      data: vrmsArray,
    },
  ];
  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      height: 350,
      type: "area",
      dataLabels: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <React.Fragment>
      <Typography align="center">Vrms</Typography>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}

export default AdeRelayChartVrms;
