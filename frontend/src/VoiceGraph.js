import React from "react";
import LineChart from "react-linechart";

export class VoiceGraph extends React.Component {
  render() {
    return (
      <LineChart
        height={400}
        hidePoints={true /* don't render the data points */}
        interpolate={null /* don't try to guess data between points */}
        xLabel={"Time"}
        yLabel={"Persion"}
        showLegends
        data={this.props.data}
      />
    );
  }
}
