import React, { useRef, useEffect, useState,  } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import * as d3 from 'd3';
import {
  Svg,
  G,
  Line,
  Rect,
  Text as SvgText,
} from 'react-native-svg';

const data = [  {    title: 'Avg and data',    subtitle: '$/Store',    ranges: [300],
    measures: [220, 220],
    markers: [250],
  },
];

const BulletChart = () => {
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: Dimensions.get('window').width , height: 75 });

  // useEffect(() => {
  //  if (chartRef.current) {
  //    setDimensions(chartRef.current.getBoundingClientRect());
  //  }
  // }, []);

  const margin = { top: 5, right: 40, bottom: 20, left: 120 };
  const width = dimensions.width - margin.left - margin.right;
  const height = 75 - margin.top - margin.bottom;

  // const chart = d3.bullet(width, height).width(width).height(height);

  const randomize = (d) => {
    if (!d.randomizer) d.randomizer = randomizer(d);
    d.ranges = d.ranges.map(d.randomizer);
    d.markers = d.markers.map(d.randomizer);
    d.measures = d.measures.map(d.randomizer);
    return d;
  };

  const randomizer = (d) => {
    const k = d3.max(d.ranges) * 0.2;
    return (d) => {
      return Math.max(0, d + k * (Math.random() - 0.5));
    };
  };

  return (
    <View style={{ width: "100%" }}>
      <Svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <G transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d, index) => (
            <G key={index}>
              <Rect
                x={0}
                y={0}
                width={width/2}
                height={height}
                fill="red"
                className="bullet"
              />
              <Rect
                x={width/2}
                y={0}
                width={40}
                height={height}
                fill="darkgreen"
                className="bullet"
              />
              <Rect
                x={width/2+40}
                y={0}
                width={width/2-40}
                height={height}
                fill="#eee"
                className="bullet"
              />
              
              <Line
                x1={0}
                y1={height / 2}
                x2={width/2+10 }
                y2={height / 2}
                stroke="#000"
                strokeWidth={2}
                className="marker"
              />
              <SvgText
                x={width + 5}
                y={height / 2}
                textAnchor="start"
                className="title"
                fontSize={14}
                fontWeight="bold"
              >
                {d.title}
              </SvgText>
              <SvgText
                x={width + 5}
                y={height / 2 + 20}
                textAnchor="start"
                className="subtitle"
                fontSize={12}
                fontWeight="normal"
              >
                {d.subtitle}
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default BulletChart;



