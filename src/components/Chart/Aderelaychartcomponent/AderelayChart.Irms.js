import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function AdeRelayChartIrms() {
  const { deviceId } = useParams();

  const { data: irms } = useContextEngine(`telemetry.${deviceId}.irms`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [irmsArray, setIrmsArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setIrmsArray([...irmsArray.slice(1), irms.value]);
    // eslint-disable-next-line
  }, [irms]);
  const series = [
    {
      name: "Irms",
      data: irmsArray,
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
      <Typography align="center" variant="h5">
        Irms
      </Typography>
    </React.Fragment>
  );
}

export default AdeRelayChartIrms;
