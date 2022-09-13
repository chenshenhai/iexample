/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeReactLibCounter from './codes/react/counter/src/lib/counter?raw';
import codeReactUtilAdd from './codes/react/counter/src/util/add?raw';
import codeReactUtilAdd2 from './codes/react/counter/src/util/add2?raw';
import codeReactApp from './codes/react/counter/src/app?raw';
import codeReactApp2 from './codes/react/counter/src/app2?raw';
import codeReactAppCss from './codes/react/counter/src/app.css?raw';
import codeReactIndexPage from './codes/react/counter/index.html?raw';
import tpl from './tpl.html?raw';
import {
  ReactProjectCompiler,
  parseCompiledJsCodeList,
  parseCompiledCssCodeList
} from '../../src';
import type { CodeDirectory } from '@iexample/types';

const dir: CodeDirectory = [
  {
    path: '@/src',
    name: 'src',
    type: 'folder',
    children: [
      {
        path: '@/src/util',
        name: 'lib',
        type: 'folder',
        children: [
          {
            path: '@/src/util/add.ts',
            name: 'add.ts',
            type: 'file',
            content: codeReactUtilAdd,
            codeType: 'react',
            fileType: 'typescript'
          },
          {
            path: '@/src/util/add2.ts',
            name: 'add2.ts',
            type: 'file',
            content: codeReactUtilAdd2,
            codeType: 'react',
            fileType: 'typescript'
          }
        ]
      },
      {
        path: '@/src/lib',
        name: 'lib',
        type: 'folder',
        children: [
          {
            path: '@/src/lib/counter.tsx',
            name: 'conter.tsx',
            type: 'file',
            content: codeReactLibCounter,
            codeType: 'react',
            fileType: 'typescript'
          },
          {
            path: '@/src/lib/log.ts',
            name: 'log.ts',
            type: 'file',
            content: codeReactLibCounter,
            codeType: 'react',
            fileType: 'typescript'
          }
        ]
      },
      {
        path: '@/src/app.tsx',
        name: 'app.tsx',
        type: 'file',
        content: codeReactApp,
        codeType: 'react',
        fileType: 'typescript'
      },
      {
        path: '@/src/app2.tsx',
        name: 'app2.tsx',
        type: 'file',
        content: codeReactApp2,
        codeType: 'react',
        fileType: 'typescript'
      },
      {
        path: '@/src/app.css',
        name: 'app.css',
        type: 'file',
        content: codeReactAppCss,
        codeType: 'css',
        fileType: 'css'
      }
    ]
  },
  {
    path: '@/index.html',
    name: 'index.html',
    type: 'file',
    content: codeReactIndexPage,
    codeType: 'html',
    fileType: 'html'
  }
];

// function main() {
//   const compiler = new ReactProjectCompiler();
//   compiler.setFiles(dir);
//   compiler.setEntryList(['@/src/app.tsx', '@/src/app2.tsx']);
//   const tpl = `<html>
//   <head>
//     <script type="importmap">
//       {
//         "imports": {
//           "vue": "https://unpkg.com/vue@3.2.37/dist/vue.runtime.esm-browser.js",
//           "react": "https://jspm.dev/react",
//           "react-dom": "https://jspm.dev/react-dom"
//         }
//       }
//     </script>
//     <!-- <script src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
//     <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script> -->
//     <style>
//       html,body {
//         margin: 0;
//         padding: 0;
//         background: #f0f0f0;
//         height: 100%;
//         width: 100%;
//       }
//     </style>
//     <!--INJECT_STYLE-->
//     <!--INJECT_SCRIPT_LIB-->
//   </head>
//   <body>

//     <div id="app">Loading...</div>
//     <div id="app2">Loading2...</div>

//     <!--INJECT_SCRIPT-->
//   </body>
// </html>`;

//   // compiler.setEntryList(['@/src/app.tsx']);
//   let compiledFiles = compiler.compile();

//   // // update file
//   // compiledFiles = compiler.updateFileContent(
//   //   '@/src/util/add.ts',
//   //   codeReactUtilAdd2
//   // );

//   console.log('compiledFiles ====', compiledFiles);

//   const jsList = parseCompiledJsCodeList(compiledFiles);
//   const cssList = parseCompiledCssCodeList(compiledFiles);

//   console.log('cssList ===', cssList);

//   const html = tpl
//     .replace(
//       '<!--INJECT_STYLE-->',
//       `
//   <style>
//   ${cssList.join('\n')}
//   </style>
//   `
//     )
//     .replace(
//       '<!--INJECT_SCRIPT_LIB-->',
//       `
//   <script>
//   ${defineLib}
//   </script>
//   `
//     )
//     .replace(
//       '<!--INJECT_SCRIPT-->',
//       `
//   <script type="module">
//   ${jsList.join('\n')}
//   </script>
//   `
//     );
//   const iframe = document.createElement('iframe');
//   iframe.srcdoc = html;

//   const app = document.querySelector('#app');
//   app?.appendChild(iframe);
// }

function main() {
  const compiler = new ReactProjectCompiler();
  compiler.setFiles(dir);
  // compiler.setEntryList(['@/src/app.tsx', '@/src/app2.tsx']);

  // compiler.setEntryList(['@/src/app.tsx']);
  let html = compiler.compileFormPage('@/index.html') || '';

  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);
}

main();
