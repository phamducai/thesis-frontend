import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecords } from "../../api";

function SensorChart() {
  const { deviceId } = useParams();
  const { data: temp } = useQuery(
    "Records1",
    () => getRecords(deviceId, "temp"),
    {
      initialData: [],
    }
  );
  const { data: humidity } = useQuery(
    "Records2",
    () => getRecords(deviceId, "humidity"),
    {
      initialData: [],
    }
  );
  const { data: airquality } = useQuery(
    "Records3",
    () => getRecords(deviceId, "airquality"),
    {
      initialData: [],
    }
  );

  const series = [
    {
      name: "Temp",
      data: temp.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
    {
      name: "humidity",
      data: humidity.map(({ timestamp, value }) => ({
        x: timestamp,
        y: value,
      })),
    },
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
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </React.Fragment>
  );
}

export default SensorChart;
