import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../../api";
import { Typography } from "@mui/material";

export default function SenAirquality() {
  const { deviceId } = useParams();
  const { data: airquality } = useQuery(
    "Records3",
    () => getRecords(deviceId, "airquality"),
    {
      initialData: [],
    }
  );
  const series = [
    {
      name: "airquality",
      data: airquality.map(({ timestamp, value }) => ({
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
        Airquality
      </Typography>
    </React.Fragment>
  );
}
