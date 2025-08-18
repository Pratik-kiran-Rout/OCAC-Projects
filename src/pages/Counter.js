import React, { useState } from "react";
import "./Counter.css";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-app">
      <h1 className="counter-title">Counter App</h1>
      <div className="count-value">{count}</div>
      <div className="controls">
        <button onClick={increment}>➕ Increment</button>
        <button onClick={decrement}>➖ Decrement</button>
        <button onClick={reset}>🔁 Reset</button>
      </div>
    </div>
  );
};

export default CounterApp;