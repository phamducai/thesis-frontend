// import React from "react";
// import ReactApexChart from "react-apexcharts";

// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { getRecords } from "../../../../api";
// import { Typography } from "@mui/material";

// function HistoryAderelayChartIrms() {
//   const { deviceId } = useParams();
//   const { data: irms } = useQuery(
//     "Records1",
//     () => getRecords(deviceId, "irms"),
//     {
//       initialData: [],
//     }
//   );
//   const series = [
//     {
//       data: irms.map(({ timestamp, value }) => ({
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
//       <Typography align="center">Irms</Typography>
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="area"
//         height={350}
//       />
//     </React.Fragment>
//   );
// }
// export default HistoryAderelayChartIrms;
