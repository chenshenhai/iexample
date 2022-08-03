import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom';

const App = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className='hello'>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count + 1);
      }}>Add +</button>
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)