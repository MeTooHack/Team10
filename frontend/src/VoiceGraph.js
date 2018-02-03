import React from 'react';
import LineChart from 'react-linechart';

export class VoiceGraph extends React.Component {

  render() {
      const data = [
          {
              color: "steelblue",
              points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}]
          }
      ];
      return <LineChart
          width={600}
          height={400}
          data={data}
      />
  }
}
