
// @ts-ignore
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import { compileVueSetupFile } from '../../src';
import { compileCodeToAMD } from '../../src';
import tpl from './tpl.html?raw';
import simpleVueCode from './codes/vue/simple.vue?raw';
import simpleVueMainCode from './codes/vue/simple.ts?raw';

function main() {

  const modId = './simple.vue';
  const modSource = simpleVueCode;
  const appSource = simpleVueMainCode

  const result = compileVueSetupFile(modSource, { filename: 'hello.vue' });

  const modResult = compileCodeToAMD(result.js, { id: modId });
  const appResult = compileCodeToAMD(appSource);

  const html = tpl
    .replace('<!--INJECT_SCRIPT_LIB-->', `
    <script>
    ${defineLib}
    </script>
    `)
    .replace('<!--INJECT_SCRIPT-->', `
    <script type="module">
      ${modResult.code}
    </script>
    <script type="module">
     ${appResult.code}
    </script>
  `).replace('<!--INJECT_STYLE-->', `
  <style>
    ${result.css}
  </style>
  `)

  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);

}


main()
