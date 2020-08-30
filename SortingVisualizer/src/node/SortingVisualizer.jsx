import React, { Component } from "react";
import "./SortingVisualizer.css";
import "./Toolbar.css";
import { Howl } from "howler";
import bubbleSort from "../algorithms/bubbleSort.js";
import quickSort from "../algorithms/quickSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import radixSort from "../algorithms/radixSort.js";
//File could be mudularized and split into more integral components besdes being
//formulated in one file, however for simplicity of the project scope this seemed like the best option
//for myself.

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class SortingVisualizer extends Component {
  state = { array: [] };
  componentDidMount() {
    this.generateArray();
  }
  generateArray(val = 90) {
    console.log(val);
    const Array = [];
    for (let i = 0; i < val; i++) {
      const arrayCell = {
        value: getRandomInt(1, 500),
        index: i,
        valid: 0,
      };
      Array.push(arrayCell);
    }
    this.setState({ array: Array });
  }

  //animate the sort, set a timeout to iterate and update
  //state with the (next) newly sorted iteration.
  //Sound can be added but I removed the call to the function
  //(because it gets super annoying when testing)
  animateSort(sortedArraysInOrder) {
    const sound = new Howl({
      src: sortSound,
      volume: 1.0,
      loop: false,
    });
    for (let i = 0; i < sortedArraysInOrder.length; ++i) {
      setTimeout(() => {
        const nextArray = sortedArraysInOrder[i];
        this.setState({ array: nextArray });
      }, 25 * i);
    }
  }
  //SORTS

  //Individual sort functions recieve an array of 'iteration' arrays that are the set of values
  //of which are sorted in order until complete.
  bubbleSort() {
    const sortedArraysInOrder = bubbleSort(this.state.array.slice());
    this.animateSort(sortedArraysInOrder);
  }
  mergeSort() {
    const sortedArraysInOrder = mergeSort(this.state.array.slice());
    console.log(sortedArraysInOrder);
    this.animateSort(sortedArraysInOrder);
  }
  quickSort() {
    const sortedArraysInOrder = quickSort(
      this.state.array.slice(),
      0,
      this.state.array.length - 1
    );
    this.animateSort(sortedArraysInOrder);
  }
  radixSort() {
    const sortedArraysInOrder = radixSort(this.state.array.slice());
    this.animateSort(sortedArraysInOrder);
  }
  handleSort() {
    if (this.state.code === 1) {
      this.bubbleSort();
    } else if (this.state.code === 2) {
      this.mergeSort();
    } else if (this.state.code === 3) {
      this.quickSort();
    } else if (this.state.code === 4) {
      this.radixSort();
    }
  }
  handleChange = (event) => {
    this.generateArray(parseInt(event.target.value));
  };
  render() {
    return (
      <div>
        <div className="top-bar">
          <li className="array-size-selection">
            <input
              id="changeSize"
              type="range"
              min="10"
              max="150"
              style={null}
              disabled={null}
              onChange={this.handleChange}
            />
          </li>
          <ul className="algorithm-buttons">
            <li>
              <button onClick={() => this.setState({ code: 1 })}>
                Bubble Sort
              </button>
            </li>
            <li>
              <button onClick={() => this.setState({ code: 2 })}>
                Merge Sort
              </button>
            </li>
            <li>
              <button onClick={() => this.setState({ code: 3 })}>
                Quick Sort
              </button>
            </li>
            <li>
              <button onClick={() => this.setState({ code: 4 })}>
                Radix Sort
              </button>
            </li>
          </ul>
          <button className="sort-button" onClick={() => this.handleSort()}>
            Sort
          </button>
        </div>
        <div className="array-container">
          <div className="grid">
            {this.state.array.map((cell, id) => {
              var sortedStatus;
              if (cell.valid === 0) {
                sortedStatus = "#0466c8";
              } else if (cell.valid === 1) {
                sortedStatus = "red";
              } else if (cell.valid === 2) {
                sortedStatus = "green";
              }
              return (
                <div
                  key={cell.id}
                  className="cell"
                  style={{
                    height: `${cell.value + "px"}`,
                    width: "30px",
                    background: `${sortedStatus}`,
                    margin: "3px",
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SortingVisualizer;
