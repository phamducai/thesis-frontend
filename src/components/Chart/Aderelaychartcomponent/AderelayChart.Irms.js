import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../../lib/context-engine";
import { Typography, Button } from "@mui/material";
function AdeRelayChartIrms() {
  const { deviceId } = useParams();

  const { data: irms } = useContextEngine(`telemetry.${deviceId}.irms`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [irmsArray, setIrmsArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setIrmsArray([...irmsArray.slice(1), irms.value]);
    // eslint-disable-next-line
  }, [irms]);
  const series = [
    {
      name: "Irms",
      data: irmsArray,
    },
  ];
  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      height: 350,
      type: "area",
      dataLabels: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <React.Fragment>
      <Typography align="center">Irms</Typography>
      <Button align="left" variant="contained">
        History
      </Button>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </React.Fragment>
  );
}

export default AdeRelayChartIrms;
