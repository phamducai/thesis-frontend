import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../api";

function AdeRelayChart() {
  const { deviceId } = useParams();

  const { data: vrms } = useQuery(
    "Records1",
    () => getRecords(deviceId, "vrms"),
    {
      initialData: [],
    }
  );
  const { data: irms } = useQuery(
    "Records2",
    () => getRecords(deviceId, "irms"),
    {
      initialData: [],
    }
  );
  const { data: energy } = useQuery(
    "Records3",
    () => getRecords(deviceId, "energy"),
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
    {
      name: "Irms",
      data: irms.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
    {
      name: "Energy",
      data: energy.map(({ timestamp, value }) => ({
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
      
    </React.Fragment>
  );
}

export default AdeRelayChart;
