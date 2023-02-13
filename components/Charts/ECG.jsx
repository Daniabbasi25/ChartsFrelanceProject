import React from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { View } from "react-native";

class EcgChart extends React.PureComponent {
  render() {
   
    const labelsData=[0,1,2,3,4,5,6]
    const LineData = [
      { x: 0, y: 1.1 },
      { x: 1, y: 1 },
      { x: 2, y: 2.5 },
      { x: 3, y: -1.5 },
      { x: 4, y: 0 },
      { x: 5, y: -2.5 },
      { x: 6, y: 2.5 },
    ];
    const getLineData=(linevalue)=>{
const newLienArray=[];
linevalue?.map(item=>{
  newLienArray.push(item?.y)
})
return newLienArray;
    }
    const axesSvg = { fontSize: 10, fill: "gray" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;
const results={
    labels: [0, 1, 2, 3] ,// Array of integer
  LEAD_1: [{ x: 0, y: 1.1 }, {x: 1, y: 1.5}, ],// Array of {x: float, y: float}
   LEAD_2 : [{  }],
  LEAD_3 : [],
  LEAD_aVR: [],
  LEAD_aVL: [],
  LEAD_aVF: [],
  V1: [],
  V2: [],
  V3: [],
  V4: [],
  V5: [],
  V6: [],
}


    // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
    // All react-native-svg-charts components support full flexbox and therefore all
    // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
    // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
    // and then displace the other axis with just as many pixels. Simple but manual.

    return (
      <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
        <YAxis
          data={[-2.5, -2, -1.5, -1, 0, 1, 2, 2.5]}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={getLineData(LineData)}
            contentInset={verticalContentInset}
            svg={{ stroke: "blue" }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={labelsData}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}

export default EcgChart;
