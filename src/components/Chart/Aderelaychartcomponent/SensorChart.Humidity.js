import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function SensorChartHumidity() {
  const { deviceId } = useParams();

  const { data: humidity } = useContextEngine(
    `telemetry.${deviceId}.humidity`,
    {
      initialData: { value: 0, timestamp: "" },
    }
  );
  const [humidityArray, setHumidityArray] = React.useState(
    new Array(20).fill(0)
  );
  React.useEffect(() => {
    setHumidityArray([...humidityArray.slice(1), humidity.value]);
    // eslint-disable-next-line
  }, [humidity]);
  const series = [
    {
      name: "humidity",
      data: humidityArray,
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
      <Typography align="center" variant="h5">
        Humidity
      </Typography>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}

export default SensorChartHumidity;
