/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeReactLibCounter from './codes/react/counter/lib/counter?raw';
import codeReactUtilAdd from './codes/react/counter/util/add?raw';
import codeReactUtilAdd2 from './codes/react/counter/util/add2?raw';
import codeReactApp from './codes/react/counter/app?raw';
import tpl from './tpl.html?raw';
import { ReactProjectCompiler } from '../../src';
import type { CodeDirectory } from '@iexample/types'

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
        fileType: 'typescript',
      },
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
        fileType: 'typescript',
      },
    ]
  },
  {
    path: '@/app.tsx',
    name: 'app.tsx',
    type: 'file',
    content: codeReactApp,
    codeType: 'react',
    fileType: 'typescript',
  },
]

function main() {

  const compiler = new ReactProjectCompiler();
  compiler.setFiles(dir);
  compiler.setEntryPath('@/app.tsx');
  let compiledDir = compiler.compile();

  // update file
  compiledDir = compiler.updateFileContent('@/util/add.ts', codeReactUtilAdd2);
   
  const html = tpl.replace('<!--INJECT_SCRIPT_LIB-->', `
    <script>
    ${defineLib}
    </script>
  `).replace('<!--INJECT_SCRIPT-->', `
  ${compiledDir.map((item, i) => {
    return `
  <script type="module">
    ${item.compiledContent}
  </script>  
    `
  }).join('\n')}
  `)
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app?.appendChild(iframe);
}


main()
