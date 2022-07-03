// @ts-ignore
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import { compileReactFile, compileCodeToAMD } from '../../src';
// @ts-ignore
import tpl from './react-tpl.html?raw';

function main() {
  const source = `
import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom';

console.log('React ------', React)

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
`;

  const result = compileReactFile(source, { filename: 'hello.vue' })
  const amdResult = compileCodeToAMD(result.code);
  console.log('result ===', result);
  console.log('amdResult ===', amdResult)
  const html = tpl.replace('<!--INJECT_SCRIPT_LIB-->', `
    <script>
    ${defineLib}
    </script>
    <script>
    define('react', function() { return window.React });
    define('react-dom', function() { return window.ReactDOM });
    </script>
  `).replace('<!--INJECT_SCRIPT-->', `
    <script type="module">
      ${amdResult.code}
    </script>
  `)
  
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);

}


main()
