import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../api";

function Test() {
  const { deviceId } = useParams();

  const { data: channel1 } = useQuery(
    "Records1",
    () => getRecords(deviceId, "channel1"),
    {
      initialData: [],
    }
  );
  const { data: channel3 } = useQuery(
    "Records2",
    () => getRecords(deviceId, "channel3"),
    {
      initialData: [],
    }
  );
  console.log(channel1);
  const series = [
    {
      data: channel1.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
    {
      data: channel3.map(({ timestamp, value }) => ({
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
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </React.Fragment>
  );
}

export default Test;
