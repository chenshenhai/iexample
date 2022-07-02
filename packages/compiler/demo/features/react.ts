import { compileReactFile } from '../../src';
// @ts-ignore
import tpl from './react-tpl.html?raw';

function main() {
  const source = `
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
`;

  const result = compileReactFile(source, { filename: 'hello.vue' })
  console.log('result ===', result)
  const html = tpl.replace('<!--INJECT_SCRIPT-->', `
    <script type="module">
      ${result}
    </script>
  `)
  
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);

}


main()
