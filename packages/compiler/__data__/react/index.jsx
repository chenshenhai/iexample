import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom';

const [count, setCount] = useState(0);

const App = () => {
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count ++);
      }}>Add +</button>
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)