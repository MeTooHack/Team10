import React from "react";
import LineChart from "react-linechart";

export class VoiceGraph extends React.Component {
  render() {
    const data = [
      {
        color: "steelblue",
        points: expand([0,2,3,4,4,4,3,2,0,0,0,0,0,0,0,0,0,2,3,4,4,4,4,2,2,2,1,0,0,0,0,0])
          .map(toPoint)
      },
      {
        color: "maroon",
        points: expand([0,0,0,0,0,0,3,3,3,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,3,3,0])
          .map(toPoint)
      },
      {
        color: "green",
        points: expand([3,0,0,0,0,0,0,0,0,0,0,3,3,2,2,3,4,0,0,0,0,0,0,0,2,2,0,4,4,0,0,3])
          .map(toPoint)
      }
    ];
    console.log(data)
    return (
      <LineChart
        height={400}
        hidePoints={true /* don't render the data points */}
        xLabel={"time"}
        yLabel={"volume"}
        data={data}
      />
    );
  }
}

function expand(arr) {
  const a = [];
  for (const aa of arr) {
    const pre1 = aa * ((Math.floor(Math.random() * 100) + 70) / 100);
    const pre2 = pre1 * ((Math.floor(Math.random() * 100) + 70) / 100);
    const post1 = aa * ((Math.floor(Math.random() * 100) + 70) / 100);
    const post2 = post1 * ((Math.floor(Math.random() * 100) + 70) / 100);

    a.push(pre1, pre2, aa, post1, post2);
  }
  return a;
}

function toPoint(y,x) {
  return {
    x, y,
  }
}