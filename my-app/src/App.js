import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Pitchfinder = require("pitchfinder");
const detectPitch = Pitchfinder.AMDF();

const BUFFER_SIZE = 4096;

const NOTE_THRESHOLDS = {
  '': 50,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastNote: null,
    };
  }

  setUpMicrophoneAudio() {
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {
      let context = new AudioContext();
      let source = context.createMediaStreamSource(stream);
      let processor = context.createScriptProcessor(BUFFER_SIZE, 1, 1);
  
      source.connect(processor);
      processor.connect(context.destination);
  
      processor.onaudioprocess = (e) => {
        this.processAudio(e.inputBuffer);
      };
    });
  }

  processAudio(buf) {
    // Do something with the data, i.e Convert this to WAV
    const pitch = detectPitch(buf.getChannelData(0));
    if (pitch === null) {
      
    } else {
      console.log(pitch)
    }
  }

  componentDidMount() {
    this.setUpMicrophoneAudio();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
