import React from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { View } from "react-native";

class EcgChart extends React.PureComponent {
  render() {
    const data = [
      50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
    ];

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
          data={[-2.5,-2,-1.5,-1,0,1,2,2.5]}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={verticalContentInset}
            svg={{ stroke: "blue" }}
          >
            <Grid  />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
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
