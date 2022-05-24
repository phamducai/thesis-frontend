import React from "react";
import SensorChartTemp from "./Aderelaychartcomponent/SensorChart.Temp";
import SensorChartHumidity from "./Aderelaychartcomponent/SensorChart.Humidity";
import SensorChartAirquality from "./Aderelaychartcomponent/SensorChart.Airquality";
function SensorChart() {
  return (
    <React.Fragment>
      <SensorChartTemp />
      <SensorChartHumidity />
      <SensorChartAirquality />
    </React.Fragment>
  );
}

export default SensorChart;
