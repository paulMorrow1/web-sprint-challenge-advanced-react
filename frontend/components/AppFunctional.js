import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [grid, setGrid] = useState([
    null,
    null,
    null,
    null,
    "B",
    null,
    null,
    null,
    null,
  ]);
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const getCoordinates = () => {
    let x = 2;
    let y = 2;

    // bIndex uses findIndex to iterate through the "grid" array, and locates the index of the "B"
    const bIndex = grid.findIndex((activeSquare) =>
      Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
    );
    // if bIndex is greater than or equal to 0 AND less than or equal to 2, the y coordinate will be 1
    if (bIndex >= 0 && bIndex <= 2) {
      y = 1;
    }
    // if bIndex is greater than or equal to 3 AND less than or equal to 5, the y coordinate will be 2
    if (bIndex >= 3 && bIndex <= 5) {
      y = 2;
    }
    // if bIndex is greater than or equal to 6 AND less than or equal to 8, the y coordinate will be 3
    if (bIndex >= 6 && bIndex <= 8) {
      y = 3;
    }
    // if bIndex is equal to 0 OR 3 OR 6, the x coordinate will be 1
    if (bIndex === 0 || bIndex === 3 || bIndex === 6) {
      x = 1;
    }
    // if bIndex is equal to 1 OR 4 OR 7, the x coordinate will be 2
    if (bIndex === 1 || bIndex === 4 || bIndex === 7) {
      x = 2;
    }
    // if the bIndex is equal to 2 OR 5 OR 8, the x coordinate will be 3
    if (bIndex === 2 || bIndex === 5 || bIndex === 8) {
      x = 3;
    }
    return [x, y];
  };

  const [x, y] = getCoordinates();

  const clearMessage = () => setMessage("");

  const incrementSteps = () => setSteps(steps + 1);

  const handleMoveUp = () => {
    if (y === 1) {
      setMessage("You can't go up");
    }

    if (y === 2 || y === 3) {
      clearMessage();
      incrementSteps();
      const originalIndex = grid.findIndex((activeSquare) =>
        Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
      );
      const newGrid = grid.map(() => null);
      newGrid[originalIndex - 3] = "B";
      setGrid(newGrid);
    }
  };

  const handleMoveDown = () => {
    if (y === 3) {
      setMessage("You can't go down");
    }

    if (y === 1 || y === 2) {
      clearMessage();
      incrementSteps();
      const originalIndex = grid.findIndex((activeSquare) =>
        Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
      );
      const newGrid = grid.map(() => null);
      newGrid[originalIndex + 3] = "B";
      setGrid(newGrid);
    }
  };

  const handleMoveLeft = () => {
    if (x === 1) {
      setMessage("You can't go left");
    }

    if (x === 2 || x === 3) {
      clearMessage();
      incrementSteps();
      const originalIndex = grid.findIndex((activeSquare) =>
        Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
      );
      const newGrid = grid.map(() => null);
      newGrid[originalIndex - 1] = "B";
      setGrid(newGrid);
    }
  };

  const handleMoveRight = () => {
    if (x === 3) {
      setMessage("You can't go right");
    }

    if (x === 1 || x === 2) {
      clearMessage();
      incrementSteps();
      const originalIndex = grid.findIndex((activeSquare) =>
        Boolean(activeSquare) ? activeSquare.toLowerCase() === "b" : null
      );
      const newGrid = grid.map(() => null);
      newGrid[originalIndex + 1] = "B";
      setGrid(newGrid);
    }
  };

  const handleReset = () => {
    clearMessage();
    setSteps(0);
    setEmail("");
    setGrid([null, null, null, null, "B", null, null, null, null]);
  };

  const updateAferSubmit = (messageResponse) => {
    setEmail("");
    setMessage(messageResponse);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x,
        y,
        steps,
        email,
      })
      .then((response) => {
        updateAferSubmit(response.data.message);
      })
      .catch((error) => {
        updateAferSubmit(error.response.data.message);
      });
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x},{y})
        </h3>
        <h3 id="steps">
          You moved {steps} {`time${steps !== 1 ? "s" : ""}`}
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
        <button onClick={handleMoveLeft} id="left">
          LEFT
        </button>
        <button onClick={handleMoveUp} id="up">
          UP
        </button>
        <button onClick={handleMoveRight} id="right">
          RIGHT
        </button>
        <button onClick={handleMoveDown} id="down">
          DOWN
        </button>
        <button onClick={handleReset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        ></input>
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
