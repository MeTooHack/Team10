import React from "react";
import MediaStreamRecorder from "msr";

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

    const response = await fetch('http://localhost:5000/gender', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      this.setState({
        error: {
          status: response.statusCode,
          statusText: response.statusText,
          message: response.text()
        }
      });
    } else {
      this.setState({
        error: null,
        gender: await response.json()
      })
    }
  }

  render() {
    const { isRecording, blob, gender, error } = this.state;
    return (
      <div>
        <h2>Record Audio</h2>
        <p>{JSON.stringify(gender)}</p>
        <p>{JSON.stringify(error)}</p>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop} disabled={!isRecording}>
          Stop
        </button>
        <button onClick={this.resume} disabled={!isRecording}>
          Resume
        </button>
        <button onClick={this.pause} disabled={!isRecording}>
          Pause
        </button>
        <button onClick={this.analyse} disabled={!blob}>
          Analyse
        </button>
      </div>
    );
  }
}
