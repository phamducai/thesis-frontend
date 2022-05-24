import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../../../api";
import { Typography } from "@mui/material";

function HistoryAderelayChartVrms() {
  const { deviceId } = useParams();
  const { data: vrms } = useQuery(
    "Records1",
    () => getRecords(deviceId, "Vrms1"),
    {
      initialData: [],
    }
  );
  const series = [
    {
      name: "Vrms",
      data: vrms.map(({ timestamp, value }) => ({
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
      <Typography align="center">Vrms</Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}
export default HistoryAderelayChartVrms;
