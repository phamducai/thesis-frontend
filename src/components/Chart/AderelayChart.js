import React from "react";
import AdeRelayChartVrms from "./Aderelaychartcomponent/AderelayChart.Vrms";
import AdeRelayChartIrms from "./Aderelaychartcomponent/AderelayChart.Irms";
import AdeRelayChartPower from "./Aderelaychartcomponent/AderelayChart.power";
function AdeRelayChart() {
  return (
    <React.Fragment>
      <AdeRelayChartVrms />
      <AdeRelayChartIrms />
      <AdeRelayChartPower />
    </React.Fragment>
  );
}

export default AdeRelayChart;
