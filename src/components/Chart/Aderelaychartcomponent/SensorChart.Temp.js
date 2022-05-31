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

function SensorChartTemp() {
  const { deviceId } = useParams();

  const { data: temp } = useContextEngine(`telemetry.${deviceId}.temp`, {
    initialData: { value: 0, timestamp: new Date() },
  });
  const [tempArray, setTempArray] = React.useState([]);

  React.useEffect(() => {
    setTempArray([...tempArray, { y: temp.value, x: temp.timestamp }]);

    // eslint-disable-next-line
  }, [temp]);
  const series = [{ data: tempArray }];

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
      <Typography align="center" variant="h5">
        Temp
      </Typography>
    </React.Fragment>
  );
}

export default SensorChartTemp;
