import React, { useState } from 'react';
import { add } from './add';

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className='hello'>
      <div>{count}</div>
      <button onClick={() => {
        setCount(add(count));
      }}>Add +</button>
    </div>
  )
}

export default Counter;