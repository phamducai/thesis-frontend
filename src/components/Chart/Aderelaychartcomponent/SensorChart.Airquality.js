import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography } from "@mui/material";
function SensorChartAirquality() {
  const { deviceId } = useParams();
  const { data: airquality } = useContextEngine(
    `telemetry.${deviceId}.airquality`,
    {
      initialData: { value: 0, timestamp: "" },
    }
  );
  const [airqualityArray, setAirqualityArray] = React.useState(
    new Array(20).fill(0)
  );
  React.useEffect(() => {
    setAirqualityArray([...airqualityArray.slice(1), airquality.value]);
    // eslint-disable-next-line
  }, [airquality]);
  const series = [
    {
      name: "Airquality",
      data: airqualityArray,
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
        Airquality
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

export default SensorChartAirquality;
