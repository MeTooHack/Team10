import React from "react";
import LineChart from "react-linechart";

export class VoiceGraph extends React.Component {
  render() {
    const data = [
      {
        color: "steelblue",
        points: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]
      }
    ];
      return <LineChart
          width={800}
          height={400}

          hidePoints={true /* don't render the data points */}
          interpolate={null /* don't try to guess data between points */}

          xLabel={'time'}
          yLabel={'volume'}
          data={data} />;
  }
}
