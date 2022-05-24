import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function SensorChartTemp() {
  const { deviceId } = useParams();

  const { data: temp } = useContextEngine(`telemetry.${deviceId}.temp`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [tempArray, setTempArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setTempArray([...tempArray.slice(1), temp.value]);
    // eslint-disable-next-line
  }, [temp]);
  const series = [
    {
      name: "Temp",
      data: tempArray,
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
      <Typography align="center">Temp</Typography>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}

export default SensorChartTemp;
