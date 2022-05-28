import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function AdeRelayChartPower() {
  const { deviceId } = useParams();

  const { data: power } = useContextEngine(`telemetry.${deviceId}.power`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [powerArray, setPowerArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setPowerArray([...powerArray.slice(1), power.value]);
    // eslint-disable-next-line
  }, [power]);
  const series = [
    {
      name: "Power",
      data: powerArray,
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
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />{" "}
      <Typography align="center">Power</Typography>
    </React.Fragment>
  );
}
export default AdeRelayChartPower;
