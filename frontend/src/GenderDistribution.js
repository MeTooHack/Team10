// @flow

import React from "react";
import PieChart from "react-minimal-pie-chart";

export function GenderDistribution() {
  const data = [
    { value: 10, key: "women", color: "#E38627" },
    { value: 15, key: "men", color: "#C13C37" }
  ];

  return (
    <div style={{ ...styles.row, marginLeft: 40 }}>
      <PieChart data={data} animate />
      <Legend data={data} />
    </div>
  );
}

function Legend(props) {
  const { data } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10
      }}
    >
      {data
        .concat() // copy the data
        .sort((a, b) => b.value - a.value) // order by value desc
        .map(d => {
          return (
            <div key={d.key} style={{ ...styles.row, marginBottom: 5 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  backgroundColor: d.color
                }}
              />
              {d.key}
            </div>
          );
        })}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    flexDirection: "row"
  }
};
