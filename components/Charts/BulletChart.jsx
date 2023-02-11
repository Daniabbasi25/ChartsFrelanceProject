import React, { useState } from "react";
import { View, Text } from "react-native";

const PointGenerator = (start, end) => {
  const values = [];
  const step = (end - start) / 9;
  for (let i = 0; i <= 9; i++) {
    values.push(Math.round(start + i * step));
  }
  return values;
};

const findClosest = (value, arr) => {
  return arr.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
};

const BulletChart = () => {
  const results = {
    sex: 1,
    weight: 60.3,
    adcr: 2626.928,
    adcr_cons_inf: 2495.581,
    adcr_cons_sup: 2758.274,
    fm_hc_pc: 14.191,
    fm_hc_pc_inf: 7,
    mms_kg: 27.458,
    mms_ref_kg: 27.167,
    mms_et_kg: 0.291,
    cmo: 2.532,
    cmo_ref: 2.461,
    cmo_et: 0.071,
    ffw_pc: 69.686,
    ffw_pc_ref: 72.2,
    ffw_et: -1.263,
  };

  const data = [
    {
      id: "Dépense énergétique (kcal)",
      minValue: results.adcr_cons_inf - 100,
      maxValue: results.adcr_cons_sup + 100,
      ranges: [
        0,
        results.adcr_cons_inf,
        (results.adcr_cons_sup - results.adcr_cons_inf) / 2 +
          results.adcr_cons_inf,
        results.adcr_cons_sup,
        results.adcr_cons_sup + 500,
      ],
      measures: [results.adcr],
      markers: [],
      colors: ["#D85E5E", "#5FB46E", "#EEA76C", "#D85E5E"],
    },
    {
      id: "Masse grasse à hydratation constante (%)",
      minValue: 0,
      maxValue: results.fm_hc_pc + 5,
      ranges: [0, results.fm_hc_pc_inf, 100],
      measures: [results.fm_hc_pc],
      markers: [],
      colors: ["#D85E5E", "#5FB46E"],
    },
    {
      id: "Masse musculaire squelettique (kg)",
      minValue: 0.5 * results.mms_ref_kg,
      maxValue: results.mms_kg + 5,
      ranges: [0, 0.7 * results.mms_ref_kg, results.weight],
      measures: [results.mms_kg],
      markers: [results.mms_ref_kg],
      colors: ["#D85E5E", "#5FB46E"],
    },
    {
      id: "Contenu minéral osseux (kg)",
      minValue: 0,
      maxValue: results.cmo + 1,
      ranges: [0, 0.7 * results.cmo_ref, results.weight],
      measures: [results.cmo],
      markers: [results.cmo_ref],
      colors: ["#D85E5E", "#5FB46E"],
    },
    {
      id: "Hydratation hors graisse (%)",
      minValue: 60,
      maxValue: 85,
      ranges: [66, 78, 100],
      measures: [results.ffw_pc],
      markers: [results.ffw_pc_ref],
      colors: ["#D85E5E", "#5FB46E", "#D85E5E"],
    },
  ];
  return (
    // range starting and ending point
    // range of colors
    // array of colors
    // point where black line ends
    <View style={{ flex: 1 }}>
      {data.map((item) => {
        // {start,end,rangeofcolors,arrayofcolors,blacklinepoint}
        return (
          <MainApp
            start={item.minValue}
            end={item.maxValue}
            rangeofcolors={item.ranges}
            arrayofcolors={item.colors}
            blacklinepoint={item.measures}
            markers={item.markers}
          />
        );
      })}
    </View>
  );
};

const sortrangeofcolors = (rangeofcolors, values) => {
  let newrange = [];
  rangeofcolors.map((item) => {
    const newitem = findClosest(item, values);
    newrange.push(newitem);
  });
  return newrange;
};
const MainApp = ({
  start,
  end,
  rangeofcolors,
  arrayofcolors,
  blacklinepoint,
  markers,
}) => {
  const [values, setValues] = useState(PointGenerator(start, end));
  const [range, setRange] = useState(sortrangeofcolors(rangeofcolors, values));
  const [mymarkers, setMymarkers] = useState(
    sortrangeofcolors(markers, values)
  );
  const [colors, setColors] = useState(arrayofcolors);
  const [selectedValue, setSelectedValue] = useState(
    findClosest(blacklinepoint, values)
  );

  console.log(sortrangeofcolors(rangeofcolors, values));
  range.shift();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "100%", height: 50, backgroundColor: "lightgray" }}>
        {range.map((rangeValue, index) => {
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                left: `${(values.indexOf(range[index - 1] || 0) / 9) * 100}%`,
                top: 0,
                bottom: 0,
                width: `${
                  ((values.indexOf(range[index]) -
                    values.indexOf(range[index - 1] || 0)) /
                    9) *
                  100
                }%`,
                backgroundColor: colors[index],
              }}
            />
          );
        })}
        {values.map((value, index) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              left: `${(index / 9) * 95}%`,
              top: 50,
              fontSize: 12,
            }}
          >
            {value}
          </Text>
        ))}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: "45%",
            bottom: 0,
            width: `${(values.indexOf(selectedValue) / 9) * 100}%`,
            backgroundColor: "black",
            zIndex: 1,
            height: 10,
          }}
        />

        {mymarkers.map((item) => (
          <View
            style={{
              position: "absolute",
              left: `${(values.indexOf(item) / 9) * 100}%`,
              top: 0,
              bottom: 0,
              width: `1%`,
              backgroundColor: "black",
              zIndex: 1,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default BulletChart;
