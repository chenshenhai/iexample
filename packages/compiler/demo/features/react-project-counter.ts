/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeReactLibCounter from './codes/react/counter/lib/counter?raw';
import codeReactUtilAdd from './codes/react/counter/util/add?raw';
import codeReactUtilAdd2 from './codes/react/counter/util/add2?raw';
import codeReactApp from './codes/react/counter/app?raw';
import codeReactApp2 from './codes/react/counter/app2?raw';
import codeReactAppCss from './codes/react/counter/app.css?raw';
import tpl from './tpl.html?raw';
import {
  ReactProjectCompiler,
  parseCompiledJsCodeList,
  parseCompiledCssCodeList
} from '../../src';
import type { CodeDirectory } from '@iexample/types';

const dir: CodeDirectory = [
  {
    path: '@/util',
    name: 'lib',
    type: 'folder',
    children: [
      {
        path: '@/util/add.ts',
        name: 'add.ts',
        type: 'file',
        content: codeReactUtilAdd,
        codeType: 'react',
        fileType: 'typescript'
      },
      {
        path: '@/util/add2.ts',
        name: 'add2.ts',
        type: 'file',
        content: codeReactUtilAdd2,
        codeType: 'react',
        fileType: 'typescript'
      }
    ]
  },
  {
    path: '@/lib',
    name: 'lib',
    type: 'folder',
    children: [
      {
        path: '@/lib/counter.tsx',
        name: 'conter.tsx',
        type: 'file',
        content: codeReactLibCounter,
        codeType: 'react',
        fileType: 'typescript'
      },
      {
        path: '@/lib/log.ts',
        name: 'log.ts',
        type: 'file',
        content: codeReactLibCounter,
        codeType: 'react',
        fileType: 'typescript'
      }
    ]
  },
  {
    path: '@/app.tsx',
    name: 'app.tsx',
    type: 'file',
    content: codeReactApp,
    codeType: 'react',
    fileType: 'typescript'
  },
  {
    path: '@/app2.tsx',
    name: 'app2.tsx',
    type: 'file',
    content: codeReactApp2,
    codeType: 'react',
    fileType: 'typescript'
  },
  {
    path: '@/app.css',
    name: 'app.css',
    type: 'file',
    content: codeReactAppCss,
    codeType: 'css',
    fileType: 'css'
  }
];

function main() {
  const compiler = new ReactProjectCompiler();
  compiler.setFiles(dir);
  compiler.setEntryList(['@/app.tsx', '@/app2.tsx']);

  // compiler.setEntryList(['@/app.tsx']);
  let compiledFiles = compiler.compile();

  // update file
  compiledFiles = compiler.updateFileContent(
    '@/util/add.ts',
    codeReactUtilAdd2
  );

  console.log('compiledFiles ====', compiledFiles);

  const jsList = parseCompiledJsCodeList(compiledFiles);
  const cssList = parseCompiledCssCodeList(compiledFiles);

  console.log('cssList ===', cssList);

  const html = tpl
    .replace(
      '<!--INJECT_STYLE-->',
      `
  <style>
  ${cssList.join('\n')}
  </style>
  `
    )
    .replace(
      '<!--INJECT_SCRIPT_LIB-->',
      `
  <script>
  ${defineLib}
  </script>
  `
    )
    .replace(
      '<!--INJECT_SCRIPT-->',
      `
  <script type="module">
  ${jsList.join('\n')}
  </script> 
  `
    );
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);
}

main();
