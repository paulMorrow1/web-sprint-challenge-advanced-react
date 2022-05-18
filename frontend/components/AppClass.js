import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    onSquare: 4,
    x: 2,
    y: 2,
    steps: 0,
    email: "",
    message: "",
  };

  componentDidMount = () => {
    console.log(this.state);
  };

  handleMoveUp = (e) => {
    if (this.state.onSquare === 4) {
      this.setState({
        ...this.state,
        onSquare: 1,
        x: 2,
        y: 1,
        steps: 1,
      });
    } else if (this.state.onSquare === 3) {
      this.setState({
        ...this.state,
        onSquare: 0,
        x: 1,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 5) {
      this.setState({
        ...this.state,
        onSquare: 2,
        x: 3,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 6) {
      this.setState({
        ...this.state,
        onSquare: 3,
        x: 1,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 7) {
      this.setState({
        ...this.state,
        onSquare: 4,
        x: 2,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 8) {
      this.setState({
        ...this.state,
        onSquare: 5,
        x: 3,
        y: 2,
        steps: this.state.steps + 1,
      });
    }
  };

  handleMoveDown = (e) => {
    if (this.state.onSquare === 4) {
      this.setState({
        ...this.state,
        onSquare: 7,
        x: 2,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 3) {
      this.setState({
        ...this.state,
        onSquare: 6,
        x: 1,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 5) {
      this.setState({
        ...this.state,
        onSquare: 8,
        x: 3,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 0) {
      this.setState({
        ...this.state,
        onSquare: 3,
        x: 1,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 1) {
      this.setState({
        ...this.state,
        onSquare: 4,
        x: 2,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 2) {
      this.setState({
        ...this.state,
        onSquare: 5,
        x: 3,
        y: 2,
        steps: this.state.steps + 1,
      });
    }
  };

  handleMoveLeft = (e) => {
    if (this.state.onSquare === 4) {
      this.setState({
        ...this.state,
        onSquare: 3,
        x: 2,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 5) {
      this.setState({
        ...this.state,
        onSquare: 4,
        x: 2,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 1) {
      this.setState({
        ...this.state,
        onSquare: 0,
        x: 1,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 2) {
      this.setState({
        ...this.state,
        onSquare: 1,
        x: 2,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 7) {
      this.setState({
        ...this.state,
        onSquare: 6,
        x: 1,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 8) {
      this.setState({
        ...this.state,
        onSquare: 7,
        x: 2,
        y: 3,
        steps: this.state.steps + 1,
      });
    }
  };

  handleMoveRight = (e) => {
    if (this.state.onSquare === 4) {
      this.setState({
        onSquare: 5,
        x: 3,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 3) {
      this.setState({
        ...this.state,
        onSquare: 4,
        x: 2,
        y: 2,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 1) {
      this.setState({
        ...this.state,
        onSquare: 2,
        x: 3,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 0) {
      this.setState({
        ...this.state,
        onSquare: 1,
        x: 2,
        y: 1,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 6) {
      this.setState({
        ...this.state,
        onSquare: 7,
        x: 2,
        y: 3,
        steps: this.state.steps + 1,
      });
    } else if (this.state.onSquare === 7) {
      this.setState({
        ...this.state,
        onSquare: 8,
        x: 3,
        y: 3,
        steps: this.state.steps + 1,
      });
    }
  };

  handleReset = (e) => {
    this.setState({
      onSquare: 4,
      x: 2,
      y: 2,
      steps: 0,
      email: "",
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            {`Coordinates (${this.state.x}, ${this.state.y})`}
          </h3>
          <h3 id="steps">
            {this.state.steps !== 1
              ? `You moved ${this.state.steps} times`
              : `You moved ${this.state.steps} time`}
          </h3>
        </div>
        <div id="grid">
          <div
            className={`square ${this.state.onSquare === 0 ? "active" : ""}`}
          >
            {this.state.onSquare === 0 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 1 ? "active" : ""}`}
          >
            {this.state.onSquare === 1 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 2 ? "active" : ""}`}
          >
            {this.state.onSquare === 2 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 3 ? "active" : ""}`}
          >
            {this.state.onSquare === 3 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 4 ? "active" : ""}`}
          >
            {this.state.onSquare === 4 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 5 ? "active" : ""}`}
          >
            {this.state.onSquare === 5 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 6 ? "active" : ""}`}
          >
            {this.state.onSquare === 6 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 7 ? "active" : ""}`}
          >
            {this.state.onSquare === 7 ? "B" : ""}
          </div>
          <div
            className={`square ${this.state.onSquare === 8 ? "active" : ""}`}
          >
            {this.state.onSquare === 8 ? "B" : ""}
          </div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleMoveLeft}>
            LEFT
          </button>
          <button id="up" onClick={this.handleMoveUp}>
            UP
          </button>
          <button id="right" onClick={this.handleMoveRight}>
            RIGHT
          </button>
          <button id="down" onClick={this.handleMoveDown}>
            DOWN
          </button>
          <button id="reset" onClick={this.handleReset}>
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
