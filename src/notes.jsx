import React, { Component } from "react";
import Note from "./note";
import { Howl, Howler } from "howler";
import A3 from "./sounds/5/A3.mp3";
import B4 from "./sounds/2/B4.mp3";
import E3 from "./sounds/6/E3.mp3";
import E5 from "./sounds/1/E5.mp3";
import G4 from "./sounds/3/G4.mp3";
import D4 from "./sounds/4/D4.mp3";
const noteSound = [
  {
    key: 0,
    note: [
      { sound: A3, name: "A3" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  }, //will be all the notes that one string can make (which
  //is unique to itself)
  {
    key: 1,
    note: [
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  }, //Arrays, I lose the ability to index via object property
  {
    key: 2,
    note: [
      { sound: E3, name: "E3" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  }, //if I use arrays however, I can correspoond index value to select value
  {
    key: 3,
    note: [
      { sound: E5, name: "E5" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  },
  {
    key: 4,
    note: [
      { sound: G4, name: "G4" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  },
  {
    key: 5,
    note: [
      { sound: D4, name: "D4" },
      { sound: B4, name: "B4" },
      { sound: B4, name: "B4" }
    ]
  }
];
class Notes extends Component {
  state = {};

  playSound() {
    console.log("play sound!");
  }

  render() {
    return (
      <div className="note-container">
        {noteSound.map(note => (
          <Note stringTunes={note.note} />
        ))}
      </div>
    );
  }
  //sound={note.note.sound} name={note.note.name}
}

export default Notes;
