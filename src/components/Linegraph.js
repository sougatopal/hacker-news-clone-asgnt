import React from "react";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Grid,
  Legend,
  Margin,
  Title,
  Tooltip
} from "devextreme-react/ui/chart";

function customizeTooltip(arg) {
  return {
    text: arg.valueText
  };
}
function Linegraph(props) {
  return (
    <div id={"chart-demo"}>
      <Chart palette={"Violet"} dataSource={props.linegraphData}>
        <CommonSeriesSettings argumentField={"ID"} type={"line"} />
        <Series key={"vote"} valueField={"vote"} name={"Vote"} />
        <Margin bottom={20} />
        <ArgumentAxis
          valueMarginsEnabled={false}
          discreteAxisDivisionMode={"crossLabels"}
        >
          <Grid visible={true} />
        </ArgumentAxis>
        <Legend
          verticalAlignment={"bottom"}
          horizontalAlignment={"center"}
          itemTextPosition={"bottom"}
        />
        <Export enabled={true} />
        <Title text={"votes vs ID"} />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
      </Chart>
    </div>
  );
}

export default Linegraph;
