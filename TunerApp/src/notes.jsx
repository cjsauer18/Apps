import React, { Component } from "react";
import Note from "./note";
import sounds from "./sound.json"; //import sound library
const noteSound = sounds.sounds;

class Notes extends Component {
  state = {};
  render() {
    return (
      //scale bar
      <React.Fragment>
        <div className="note-container">
          <div className="scale-bar">
            <ul>
              <li>-7</li>
              <li>-6</li>
              <li>-5</li>
              <li>-4</li>
              <li>-3</li>
              <li>-2</li>
              <li>-1</li>
              <li className="scale-left"> 0</li>
              <li className="scale-left"> 1</li>
              <li className="scale-left"> 2</li>
              <li className="scale-left"> 3</li>
              <li className="scale-left"> 4</li>
              <li className="scale-left"> 5</li>
              <li className="scale-left"> 6</li>
              <li className="scale-left"> 7</li>
            </ul>
          </div>
          {noteSound.map(note => (
            <Note stringTunes={note} /> //map out each sound container object to separate note component
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Notes;
