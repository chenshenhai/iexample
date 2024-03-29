import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { add } from './util/add2';
import './lib/log';

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className='hello'>
      <div>{count}</div>
      <button onClick={() => {
        setCount(add(count));
      }}>Add 2 +</button>
    </div>
  )
} 

const root = ReactDOM.createRoot(document.querySelector('#app2'));

root.render(<Counter />, )