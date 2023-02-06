import { BarChart } from "react-native-svg-charts";
import { View, Text } from 'react-native'
import React from 'react'

const BulletChart = () => {
    const data = [
      50, 50, 50
    ];

  return (
    <BarChart
      style={{ height: 200 }}
      gridMin={-100}
      gridMax={120}
      data={data}
      
      svg={{ fill: "red" }}
      contentInset={{ top: 30, bottom: 30 }}
    >
     
    </BarChart>
  );
}

export default BulletChart