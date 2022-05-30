import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../../api";
import { Typography } from "@mui/material";

export default function AdePower() {
  const { deviceId } = useParams();
  const { data: power } = useQuery(
    "Records3",
    () => getRecords(deviceId, "power"),
    {
      initialData: [],
    }
  );
  const series = [
    {
      name: "power",
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
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
      <Typography variant="h5" align="center">
        Power
      </Typography>
    </React.Fragment>
  );
}
