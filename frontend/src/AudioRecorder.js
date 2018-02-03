import React from "react";
import MediaStreamRecorder from "msr";

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      blobUrl: null
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
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
        this.mediaRecorder.start(3000);
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

  render() {
    const { isRecording, blobURL } = this.state;
    return (
      <div>
        <h2>Record Audio</h2>
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
        <a href={blobURL}>Save</a>
      </div>
    );
  }
}
