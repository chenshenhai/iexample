// @ts-ignore
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import { compileReactFile, compileCodeToAMD } from '../../src';
// @ts-ignore
import tpl from './tpl.html?raw';

function main() {
  const source = `
import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count + 1);
      }}>Add +</button>
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)
`;

  const result = compileReactFile(source, { filename: 'hello.vue' })
  const amdResult = compileCodeToAMD(result.code);
  const html = tpl.replace('<!--INJECT_SCRIPT_LIB-->', `
    <script>
    ${defineLib}
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
