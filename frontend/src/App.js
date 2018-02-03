import React from "react";
import { VoiceGraph } from "./VoiceGraph";
import { SuppressionTechniquesList } from "./SuppressionTechniquesList";
import { GenderDistribution } from "./GenderDistribution";
import MediaStreamRecorder from "msr";
import "./App.css";
import "material-components-web/dist/material-components-web.min.css";

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import { Button } from 'rmwc/Button';

export default class App extends React.Component {
  state = {
    isRecording: false,
    isAnalysing: false,
    hasAnalysed: false
  }

  analyseInterval = async blob => {
    this.setState({
      isAnalysing: true
    });

    const formData = new FormData()
    formData.append('audio', blob);

    const response = await fetch('http://localhost:5000/gender', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      this.setState({
        error: {
          status: response.statusCode,
          statusText: response.statusText,
          message: await response.text()
        }
      });
    }

    try {
      this.setState({
        hasAnalysed: true,
        gender: await response.json()
      })
    } catch (error) {
      this.setState({ error });
    }
  }

  startAnalysing = () => {
    navigator.getUserMedia(
      {
        audio: true
      },
      stream => {
        this.mediaRecorder = new MediaStreamRecorder(stream);
        this.mediaRecorder.stream = stream;
        this.mediaRecorder.mimeType = "audio/wav"; // check this line for audio/wav
        this.mediaRecorder.start(5000);
        this.mediaRecorder.ondataavailable = this.analyseInterval;
        this.setState({ isRecording: true });
      },
      console.error
    );
  }

  render() {
    const { gender, isRecording, isAnalysing, hasAnalysed } = this.state;
    let buttonLabel;
    if (isRecording) {
      if (hasAnalysed) buttonLabel = 'Waiting for more data';
      else buttonLabel = 'Waiting for intial data';
    } else buttonLabel = 'Start Analysing';

    return (
      <div className="App">
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Team TÄN</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>

        <Button raised onClick={this.startAnalysing}>
          {buttonLabel}
        </Button>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flexGrow: 1 }}>
            {gender && <GenderDistribution {...gender}/>}
            <VoiceGraph />
          </div>

          <div style={{ width: "400px" }}>
            <SuppressionTechniquesList />
          </div>
        </div>
      </div>
    );
  }
}
