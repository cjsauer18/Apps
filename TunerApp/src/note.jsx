import React, { Component } from "react";
import { Howl } from "howler";

class Note extends Component {
  state = {
    //default standard tuning per string (set to standard E tuning)
    note: this.props.stringTunes.standard.sound,
    name: this.props.stringTunes.standard.name
  };
  //utility
  checkState(notes, sound) {
    if (notes.sound !== this.state.note) {
      //if new sound is playing
      this.soundStop(sound); //stop previous sound
    }
  }
  soundPlay = sound => {
    this.soundStop(sound); //stops sound from playing over itself(if called)
    sound.play();
  };
  soundStop = sound => {
    sound.stop();
  };
  setNote = (notes, sound) => {
    //takes in sound and note attributes
    this.checkState(notes, sound); //checks if previous sound is playing.
    this.setState({
      //set state
      note: notes.sound,
      name: notes.name
    });
  };
  render() {
    const sound = new Howl({
      //output sound
      src: this.state.note,
      volume: 1.0,
      loop: true
    });
    return (
      <div className="container">
        <h1 className="string-label">{this.props.stringTunes.string}</h1>
        <button
          className="stop-btn"
          onClick={() => this.soundStop(sound)}
        ></button>
        <button
          className="play-btn"
          onClick={() => this.soundPlay(sound)} //plays state
        >
          {this.state.name}
        </button>
        {this.props.stringTunes.note.map(note => (
          <li className="list">
            <button
              className="note-button"
              onClick={() => this.setNote(note, sound)}
            >
              {note.name}
            </button>
          </li>
        ))}
      </div>
    );
  }
}

export default Note;
