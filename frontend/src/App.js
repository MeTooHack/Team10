import React from "react";
import { VoiceGraph } from "./VoiceGraph";
import { SuppressionTechniquesList } from "./SuppressionTechniquesList";
import { GenderDistribution } from "./GenderDistribution";
import MediaStreamRecorder from "msr";
import { TextField } from 'rmwc/TextField';

import {
  Dialog,
  DefaultDialogTemplate,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop,
} from 'rmwc/Dialog';

import "./App.css";
import "material-components-web/dist/material-components-web.min.css";

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
} from 'rmwc/Toolbar';
import { Button } from 'rmwc/Button';
import { LinearProgress } from 'rmwc/LinearProgress';

export default class App extends React.Component {
  state = {
    isUserEnrollmentDialogOpen: false,
    userEnrollmentName: '',
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
    this.setState({ isRecording: true });
    this.subscribeToAudioBlobs(blob => {
      this.analyseInterval(blob);
      this.classifySpeakers(blob);
    });
    this.enroll();
  }

  classifySpeakers = async blob => {
    const formData = new FormData()
    formData.append('audio', blob);

    const response = await fetch('http://localhost:5001/classify', {
      method: 'POST',
      body: formData
    });

    console.log(await response.text())

  }

  async enroll() {
    return await (await fetch('http://localhost:5001/enroll', { method: 'POST' })).text();
  }

  subscribeToAudioBlobs(callback) {
    let mediaRecorder;
    let cancelled = false;

    navigator.getUserMedia(
      {
        audio: true
      },
      stream => {
        if (cancelled) return;
        mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.stream = stream;
        mediaRecorder.mimeType = "audio/wav"; // check line for audio/wav
        mediaRecorder.audioChannels = 1;
        // mediaRecorder.recorderType = StereoAudioRecorder;
        mediaRecorder.start(5000);
        mediaRecorder.ondataavailable = callback;
      },
      console.error
    );
    return {
      cancel: () => {
        mediaRecorder.stop();
        mediaRecorder.stream.stop();
      }
    }
  }

  showUserEnrollmentDialog = () => {
    this.setState({ isUserEnrollmentDialogOpen: true });
  }

  enrollUser = async () => {
    this.setState({ isUserEnrollmentRecording: true });
    this.setState({ userEnrollmentProgress: 0 });
    const before = Date.now();
    const progressInterval = setInterval(() => {
      this.setState({ userEnrollmentProgress: (Date.now() - before) / 5000 });
    }, 1000 / 30);

    const subscription = this.subscribeToAudioBlobs(async blob => {
      clearInterval(progressInterval);

      subscription.cancel();

      const formData = new FormData()
      formData.append('audio', blob);

      const response = await fetch(`http://localhost:5001/data/${this.state.userEnrollmentName}`, {
        method: 'POST',
        body: formData
      });

      this.setState({
        isUserEnrollmentDialogOpen: false,
        isUserEnrollmentRecording: false,
        userEnrollmentName: ''
      });

      console.log(response.statusCode, await response.text())
    });
  }

  render() {
    const { gender, isRecording, isAnalysing, hasAnalysed, userEnrollmentName, userEnrollmentProgress, isUserEnrollmentRecording } = this.state;
    let buttonLabel;
    if (isRecording) {
      if (hasAnalysed) buttonLabel = 'Waiting for more data';
      else buttonLabel = 'Waiting for intial data';
    } else buttonLabel = 'Start Analysing';

    return (
      <div className="App">
        <Dialog
          open={this.state.isUserEnrollmentDialogOpen}
          onClose={evt => this.setState({ standardDialogOpen: false })}
        >
          <DialogSurface>
            <DialogHeader>
              <DialogHeaderTitle>Add user</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody>
              {isUserEnrollmentRecording
                ? <div>
                  <p>Speak until the meter is full</p>
                  <LinearProgress progress={userEnrollmentProgress} />
                </div>
                : <div>
                  <TextField label="Name of person to add" onChange={event => this.setState({ userEnrollmentName: event.target.value })} value={userEnrollmentName} />
                </div>
              }
            </DialogBody>
            <DialogFooter>
              <DialogFooterButton cancel onClick={() => this.setState({ isUserEnrollmentDialogOpen: false })}>Cancel</DialogFooterButton>
              <DialogFooterButton accept onClick={this.enrollUser}>Enroll</DialogFooterButton>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </Dialog>

        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>Team TÄN</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>

        <Button raised onClick={this.startAnalysing}>
          {buttonLabel}
        </Button>

        <Button onClick={this.showUserEnrollmentDialog}>Add user</Button>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flexGrow: 1 }}>
            {gender && <GenderDistribution {...gender} />}
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
