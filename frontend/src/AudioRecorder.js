import React from "react";
import MediaStreamRecorder from "msr";
import { Button } from 'rmwc/Button';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      blob: null
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
    this.analyse = this.analyse.bind(this);
  }

  start() {
    navigator.getUserMedia(
      {
        audio: true
      },
      stream => {
        this.mediaRecorder = new MediaStreamRecorder(stream);
        this.mediaRecorder.stream = stream;
        this.mediaRecorder.mimeType = "audio/wav"; // check this line for audio/wav
        this.mediaRecorder.start();
        this.mediaRecorder.ondataavailable = blob => this.setState({ blob })
        this.setState({ isRecording: true });
      },
      console.error
    );
  }

  stop() {
    this.mediaRecorder.stop();
    this.mediaRecorder.stream.stop();
  }

  resume() {
    this.mediaRecorder.resume();
  }

  pause() {
    this.mediaRecorder.pause();
  }

  async analyse() {
    const formData = new FormData()
    formData.append('audio', this.state.blob);

    const response = await fetch(this.props.endpoint, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      this.props.onResponse({
        status: response.statusCode,
        statusText: response.statusText,
        message: await response.text()
      });
    }

    try {
      this.props.onResponse(null, await response.json());
    } catch (error) {
      this.props.onResponse(error);
    }
  }

  render() {
    const { isRecording, blob } = this.state;
    return (
      <div>
        <h2>Record Audio</h2>
        <Button raised onClick={this.start}>Start</Button>
        <Button raised onClick={this.stop} disabled={!isRecording}>
          Stop
        </Button>
        <Button raised onClick={this.resume} disabled={!isRecording}>
          Resume
        </Button>
        <Button raised onClick={this.pause} disabled={!isRecording}>
          Pause
        </Button>
        <Button raised onClick={this.analyse} disabled={!blob}>
          Analyse
        </Button>
      </div>
    );
  }
}
