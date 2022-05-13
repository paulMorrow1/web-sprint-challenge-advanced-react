import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    grid: ["", "", "", "", "B", "", "", "", ""],
  };
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((square) => (
            <div className="square">{square}</div>
          ))}
          {/* <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div> */}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" /*onClick={this.state.grid}*/>LEFT</button>
          <button id="up" /*onClick={this.state.grid}*/>UP</button>
          <button id="right" /*onClick={this.state.grid}*/>RIGHT</button>
          <button id="down" /*onClick={this.state.grid}*/>DOWN</button>
          <button id="reset" onClick={this.state.grid}>
            reset
          </button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
