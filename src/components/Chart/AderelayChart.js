import React from "react";
import ReactApexChart from "react-apexcharts";

import { useParams } from "react-router-dom";
import { useContextEngine } from "../../lib/context-engine";
function AdeRelayChart() {
  const { deviceId } = useParams();

  const { data: vrms } = useContextEngine(`telemetry.${deviceId}.vrms`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [vrmsArray, setVrmsArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setVrmsArray([...vrmsArray.slice(1), vrms.value]);
    // eslint-disable-next-line
  }, [vrms]);
  const { data: irms } = useContextEngine(`telemetry.${deviceId}.irms`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [irmsArray, setIrmsArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setIrmsArray([...irmsArray.slice(1), irms.value]);
    // eslint-disable-next-line
  }, [irms]);

  const { data: power } = useContextEngine(`telemetry.${deviceId}.power`, {
    initialData: { value: 0, timestamp: "" },
  });
  const [powerArray, setPowerArray] = React.useState(new Array(20).fill(0));
  React.useEffect(() => {
    setPowerArray([...powerArray.slice(1), power.value]);
    // eslint-disable-next-line
  }, [power]);

  const series = [
    {
      name: "Vrms",
      data: vrmsArray,
    },
    {
      name: "Irms",
      data: irmsArray,
    },
    {
      name: "Power",
      data: powerArray,
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
