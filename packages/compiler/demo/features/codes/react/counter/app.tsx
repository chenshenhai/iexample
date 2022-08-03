import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom';
import Counter from './lib/counter';
import './index.css';

const App = () => {
  return (
    <div className='main'>
      <div>Hello Counter</div>
      <Counter />
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)