import React from "react";
import { VoiceGraph } from "./VoiceGraph";
import { SuppressionTechniquesList } from "./SuppressionTechniquesList";
import { GenderDistribution } from "./GenderDistribution";
import AudioRecorder from "./AudioRecorder";
import "./App.css";

export default class App extends React.Component {
  state = {
    gender: null
  }

  handleGenderResponse = (error, gender) => {
    this.setState({ gender });
  }

  render() {
    const { gender } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Team TÄN</h1>
        </header>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <AudioRecorder endpoint="http://localhost:5000/gender" onResponse={this.handleGenderResponse} />
          <div style={{ flexGrow: 1 }}>
            <VoiceGraph />
            {gender && <GenderDistribution {...gender}/>}
          </div>

          <div style={{ width: "400px" }}>
            <SuppressionTechniquesList />
          </div>
        </div>
      </div>
    );
  }
}
