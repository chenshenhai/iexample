import { compileCodeToAMD } from '../../src';


const code = `
import React from 'react';

const App = () => {
  return React.createElement(
    'div',
    { className: 'box' },
    React.createElement(
      'h1',
      { className: 'box' },
      "Hello World!"
    )
  )
}

export default App;
`

const result = compileCodeToAMD(code);

console.log('result ===', result)