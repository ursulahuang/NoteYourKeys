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

class App extends Component {
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
