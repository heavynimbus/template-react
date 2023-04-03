import './Counter.scss';
import {FunctionComponent, useState} from "react";

const Counter: FunctionComponent = () => {
  const [count, setCount] = useState<number>(0);

  return <div className="Counter">
    <h1>Counter</h1>
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  </div>
}

export default Counter;
