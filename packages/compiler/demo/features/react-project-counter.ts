/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeReactLibCounter from './codes/react/counter/lib/counter?raw';
import codeReactUtilAdd from './codes/react/counter/util/add?raw';
import codeReactApp from './codes/react/counter/app?raw';
import tpl from './tpl.html?raw';
import { compileReactProject } from '../../src';
import type { CodeDirectory } from '@iexample/types'

const dir: CodeDirectory = [
  {
    path: '@/app.tsx',
    name: 'app.tsx',
    type: 'file',
    content: codeReactApp,
    codeType: 'react',
    fileType: 'typescript',
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
  
]

function main() {


  console.log('dir ====', dir);
  const compiledDir = compileReactProject(dir);
  console.log('compiledDir ====', compiledDir);
  // const source = simpleReactCode;
  compiledDir.reverse();
   
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
