import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../../../api";
import { Typography } from "@mui/material";

function HistoryAderelayChartPower() {
  const { deviceId } = useParams();
  const { data: power } = useQuery(
    "Records1",
    () => getRecords(deviceId, "power1"),
    {
      initialData: [],
    }
  );

  const series = [
    {
      data: power.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
      dataLabels: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <React.Fragment>
      <Typography align="center">Power</Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}
export default HistoryAderelayChartPower;
