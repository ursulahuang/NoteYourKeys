import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Line, Text, Group } from 'react-konva';

/*

Bar class => generate 5 lines
          => props: 4 notes

BarLine => startBar + 4 Bars



*/

var lineSpacing = 10;
var barWidth = 400;

var a = [1,2,3];
var x = [...a];

new Note(0.25, 'A');

class Note {
  constructor(length, key) {
    this.length = length;
    this.key = key;
  }
}

class Bar extends Component {
  render() {
    return (
    <Group x={0} y={40}>
      <Line
        points={[0,0, barWidth,0]}
        stroke="black" />
      <Line
        points={[0,lineSpacing, barWidth,lineSpacing]}
        stroke="black" />
      <Line
        points={[0,2*lineSpacing, barWidth,2*lineSpacing]}
        stroke="black" />
      <Line
        points={[0,3*lineSpacing, barWidth,3*lineSpacing]}
        stroke="black" />
      <Line
        points={[0,4*lineSpacing, barWidth,4*lineSpacing]}
        stroke="black" />
      {this.props.notes.map( (noteItem, i) => {
        var pos = determineKey(noteItem.key);
        switch (noteItem.length) {
          case 0.25:
            return <Text x={pos.x + i * noteWidth} y={pos.y} text="♩"/>
          case 0.5:
            return <Text x={pos.x + i * noteWidth} y={pos.y} text="♩"/>
          default:
            break;
        }


        return <Text text="𝄞" fontSize={50}/>;
      } )}
      <Text text="♩" fontSize={40} x={10} y={0}/>
      <Text text="♪" fontSize={45} x={50} y={0}/>

    </Group>);
  }
}

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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="ABC Song" />
          <Bar notes={[1,2,3]}/>
        </Layer>
      </Stage>
    );
  }
}

export default App;
