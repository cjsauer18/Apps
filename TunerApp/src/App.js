import React from "react";
import "./App.css";
import Notes from "./notes";

function App() {
  return (
    <div>
      <div className="top-bar">
        <h1>Guitar Tuner</h1>
      </div>
      <Notes />
      <div className="footer"></div>
    </div>
  );
}

export default App;
