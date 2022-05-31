import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";

const XAXISRANGE = 60 * 1000;

const options = {
  chart: {
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: { speed: 1000 },
    },
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth" },
  title: { text: "Realtime Chart", align: "left" },
  markers: { size: 0 },
  xaxis: {
    type: "datetime",
    range: XAXISRANGE,
  },
  yaxis: { max: 300 },
  legend: { show: false },
};

function AdeRelayChartIrms() {
  const { deviceId } = useParams();

  const { data: irms } = useContextEngine(`telemetry.${deviceId}.irms`, {
    initialData: { value: 0, timestamp: new Date() },
  });

  const [irmsArray, setIrmsArray] = React.useState([]);

  React.useEffect(() => {
    setIrmsArray([...irmsArray, { y: irms.value, x: irms.timestamp }]);

    // eslint-disable-next-line
  }, [irms]);
  const series = [{ data: irmsArray }];

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />{" "}
      <Typography align="center" variant="h5">
        Irms
      </Typography>
    </React.Fragment>
  );
}

export default AdeRelayChartIrms;
