import React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { getRecords } from "../api";
function BuildingChart() {
  const deviceId = "628dab693717f8e47b085142";
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
  const { data: power } = useQuery(
    "Records3",
    () => getRecords(deviceId, "power"),
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
      name: "irms",
      data: irms.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
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
    </React.Fragment>
  );
}

export default BuildingChart;
