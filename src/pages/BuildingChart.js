import React from "react";
import ReactApexChart from "react-apexcharts";

import { useQuery } from "react-query";
import { getRecords } from "../api";
import { Typography } from "@mui/material";

function BuildingChart() {
  const { deviceId } = "1asd2312asd321412";
  const { data: vrms } = useQuery(
    "Records1",
    () => getRecords(deviceId, "vrms123"),
    {
      initialData: [],
    }
  );
  const series = [
    {
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
      <Typography align="center">Irms</Typography>
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

// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import { useQuery } from "react-query";
// import { getRecords } from "../api";
// import { Typography } from "@mui/material";
// export default function BuildingChart() {

//   const deviceId = "1asd2312asd321412";
//   const { data: vrms } = useQuery(
//     "Records1",
//     () => getRecords(deviceId, "vrms"),
//     {
//       initialData: [],
//     }
//   );
//   const { data: irms } = useQuery(
//     "Records2",
//     () => getRecords(deviceId, "irms"),
//     {
//       initialData: [],
//     }
//   );
//   const { data: power } = useQuery(
//     "Records3",
//     () => getRecords(deviceId, "power"),
//     {
//       initialData: [],
//     }
//   );

//   const series = [
//     {
//       name: "Vrms",
//       data: vrms.map(({ timestamp, value }) => ({
//         x: timestamp,
//         y: value,
//       })),
//     },
//     {
//       name: "Irms",
//       data: irms.map(({ timestamp, value }) => ({
//         x: timestamp,
//         y: value,
//       })),
//     },
//     {
//       name: "Power",
//       data: power.map(({ timestamp, value }) => ({
//         x: timestamp,
//         y: value,
//       })),
//     },
//   ];

//   const options = {
//     chart: {
//       height: 350,
//       type: "area",
//       dataLabels: {
//         enabled: false,
//       },
//     },
//     stroke: {
//       curve: "smooth",
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     tooltip: {
//       x: {
//         format: "dd/MM/yy HH:mm",
//       },
//     },
//   };

//   return (
//     <React.Fragment>
//       <Typography>SmartHome</Typography>
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="area"
//         height={350}
//       />
//     </React.Fragment>
//   );
// }
