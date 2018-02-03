import React from "react";
import { VoiceGraph } from "./VoiceGraph";
import { SuppressionTechniquesList } from "./SuppressionTechniquesList";
import { GenderDistribution } from "./GenderDistribution";
import AudioRecorder from "./AudioRecorder";
import "./App.css";
import "material-components-web/dist/material-components-web.min.css";

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
} from 'rmwc/Toolbar';

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
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Team TÄN</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>

        <AudioRecorder endpoint="http://localhost:5000/gender" onResponse={this.handleGenderResponse} />
        <div style={{ display: "flex", flexDirection: "row" }}>
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
