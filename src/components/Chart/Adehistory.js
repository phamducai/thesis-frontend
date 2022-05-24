import React from "react";
import HistoryAderelayChartVrms from "./Aderelaychartcomponent/historyAde/HistoryAderelayChart.Vrms";
import HistoryAderelayChartIrms from "./Aderelaychartcomponent/historyAde/HistoryAderelayChart.Irms";
import HistoryAderelayChartPower from "./Aderelaychartcomponent/historyAde/HistoryAderelayChart.Power";
function Adehistory() {
  return (
    <React.Fragment>
      <HistoryAderelayChartVrms />
      <HistoryAderelayChartIrms />
      <HistoryAderelayChartPower />
    </React.Fragment>
  );
}

export default Adehistory;
