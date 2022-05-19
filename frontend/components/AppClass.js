import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    grid: [null, null, null, null, "B", null, null, null, null],
    steps: 0,
    email: "",
    message: "",
  };

  componentDidMount = () => {
    console.log(this.state);
  };

  handleMoveUp = () => {
    const [_, y] = this.getCoordinates(this.state.grid);
    if (y === 1) {
      this.setState((state) => {
        return {
          ...state,
          message: "You can't go up",
        };
      });
    }

    if (y === 2 || y === 3) {
      this.setState((state) => {
        const originalIndex = state.grid.findIndex((activeSquare) =>
          Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
        );
        const newGrid = state.grid.map(() => null);
        newGrid[originalIndex - 3] = "B";

        return {
          ...state,
          grid: newGrid,
          message: "",
          steps: state.steps + 1,
        };
      });
    }
  };

  // [null, null, null]
  // [null, "B", null]
  // [null, null, null]

  handleMoveDown = () => {
    const [_, y] = this.getCoordinates(this.state.grid);

    if (y === 3) {
      this.setState((state) => {
        return {
          ...state,
          message: "You can't go down",
        };
      });
    }

    if (y === 1 || y === 2) {
      this.setState((state) => {
        const originalIndex = state.grid.findIndex((activeSquare) =>
          Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
        );
        const newGrid = state.grid.map(() => null);
        newGrid[originalIndex + 3] = "B";

        return {
          ...state,
          grid: newGrid,
          message: "",
          steps: state.steps + 1,
        };
      });
    }
  };

  handleMoveLeft = () => {
    const [x] = this.getCoordinates(this.state.grid);

    if (x === 1) {
      this.setState((state) => {
        return {
          ...state,
          message: "You can't go left",
        };
      });
    }

    if (x === 2 || x === 3) {
      this.setState((state) => {
        const originalIndex = state.grid.findIndex((activeSquare) =>
          Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
        );
        const newGrid = state.grid.map(() => null);
        newGrid[originalIndex - 1] = "B";

        return {
          ...state,
          grid: newGrid,
          message: "",
          steps: state.steps + 1,
        };
      });
    }
  };

  handleMoveRight = () => {
    const [x] = this.getCoordinates(this.state.grid);

    if (x === 3) {
      this.setState((state) => {
        return {
          ...state,
          message: "You can't go right",
        };
      });
    }

    if (x === 1 || x === 2) {
      this.setState((state) => {
        const originalIndex = state.grid.findIndex((activeSquare) =>
          Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
        );
        const newGrid = state.grid.map(() => null);
        newGrid[originalIndex + 1] = "B";

        return {
          ...state,
          grid: newGrid,
          message: "",
          steps: state.steps + 1,
        };
      });
    }
  };

  handleReset = () => {
    this.setState((state) => {
      return {
        ...state,
        grid: [null, null, null, null, "B", null, null, null, null],
        message: "",
        steps: 0,
        email: "",
      };
    });
  };

  getCoordinates = (grid) => {
    let x = 2;
    let y = 2;
    const bIndex = grid.findIndex((activeSquare) =>
      Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
    );
    if (bIndex >= 0 && bIndex <= 2) {
      y = 1;
    }
    if (bIndex >= 3 && bIndex <= 5) {
      y = 2;
    }
    if (bIndex >= 6 && bIndex <= 8) {
      y = 3;
    }

    if (bIndex === 0 || bIndex === 3 || bIndex === 6) {
      x = 1;
    }
    if (bIndex === 1 || bIndex === 4 || bIndex === 7) {
      x = 2;
    }
    if (bIndex === 2 || bIndex === 5 || bIndex === 8) {
      x = 3;
    }
    return [x, y];
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { grid, steps, email } = this.state;
    const [x, y] = this.getCoordinates(grid);
    axios
      .post("http://localhost:9000/api/result", {
        x,
        y,
        steps,
        email,
      })
      .then((response) => {
        this.setState((state) => {
          return {
            ...state,
            email: "",
            message: response.data.message,
          };
        });
      })
      .catch((error) => {
        this.setState((state) => {
          return {
            ...state,
            email: "",
            message: error.response.data.message,
          };
        });
      });
  };

  handleEmail = (event) => {
    this.setState((state) => {
      return {
        ...state,
        email: event.target.value,
      };
    });
  };

  render() {
    const { grid, steps, message, email } = this.state;
    const { className } = this.props;
    const [x, y] = this.getCoordinates(grid);
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${x},${y})`}</h3>
          <h3 id="steps">
            {`You moved ${steps} time${steps !== 1 ? "s" : ""}`}
          </h3>
        </div>
        <div id="grid">
          {grid.map((activeSquare, i) => (
            <div
              key={i}
              className={`square ${Boolean(activeSquare) ? "active" : ""}`}
            >
              {activeSquare}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
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
        <form onSubmit={this.handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleEmail}
          />
          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
