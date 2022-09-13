import React, { useState } from 'react';
import './lib/log';
import ReactDOM, { createRoot } from 'react-dom';
import Counter from './lib/counter';
import './app.css';

const App = () => {
  return (
    <div className='main'>
      <Counter />
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)