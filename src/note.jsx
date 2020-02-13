import React, { Component } from "react";
import { Howl, Howler } from "howler";
//{noteplaceholder} goes in place of "E"

class Note extends Component {
  state = {};
  soundPlay = note => {
    console.log(note);
    const sound = new Howl({
      src: note,
      volume: 1.0,
      loop: true
    });
    sound.play();
  };
  setNote = notes => {
    this.setState({
      note: notes.sound,
      name: notes.name
    });
    console.log(this.state);
  };

  render() {
    const allNotes = this.props.stringTunes;
    console.log(allNotes);

    return (
      <div className="container">
        <button
          className="play-button"
          onClick={() => this.soundPlay(this.state.note)} //plays state
        >
          {this.state.name}
        </button>
        {this.props.stringTunes.map(note => (
          <button className="note-list" onClick={() => this.setNote(note)}>
            {note.name}
          </button>
        ))}
      </div>
    );
  }
}

export default Note;
