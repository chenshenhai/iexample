/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import simpleReactCode from './codes/react/simple.tsx?raw';
import tpl from './tpl.html?raw';

import { compileReactFile, compileCodeToAMD } from '../../src';

function main() {
  const source = simpleReactCode;

  const result = compileReactFile(source, { filename: 'hello.tsx' })
  console.log('result ====', result)
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
