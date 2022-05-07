import React from "react";
import ReactApexChart from "react-apexcharts";

import { useQuery } from "react-query";
import { getRecords } from "../api";

function Test() {
  const deviceId = "6276b3031269a1c923ff50be";
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

  const series = [
    {
      name: "channel1",
      data: channel1.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
    {
      name: "channel3",
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
      />{" "}
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
