
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeReactLibCounter from './codes/react/counter/lib/counter?raw';
import codeReactLibAdd from './codes/react/counter/lib/add?raw';
import codeReactApp from './codes/react/counter/app?raw';
import tpl from './tpl.html?raw';
import { compileReactFile, compileCodeToAMD } from '../../src';
import type { CodeCompiledDirectory, CodeDirectory } from '@iexample/types'

const dir: CodeDirectory = [
  {
    path: './app.tsx',
    name: 'app.tsx',
    type: 'file',
    content: codeReactApp,
    codeType: 'react',
    fileType: 'typescript',
  },
  {
    path: './lib/conter.tsx',
    name: 'conter.tsx',
    type: 'file',
    content: codeReactLibCounter,
    codeType: 'react',
    fileType: 'typescript',
  },
  {
    path: './lib/add.ts',
    name: 'add.ts',
    type: 'file',
    content: codeReactLibAdd,
    codeType: 'react',
    fileType: 'typescript',
  }
]

function main() {


  console.log('dir ====', dir);

  // const source = simpleReactCode;

  // const result = compileReactFile(source, { filename: 'hello.tsx' })
  // console.log('result ====', result)
  // const amdResult = compileCodeToAMD(result.code);
  // const html = tpl.replace('<!--INJECT_SCRIPT_LIB-->', `
  //   <script>
  //   ${defineLib}
  //   </script>
  // `).replace('<!--INJECT_SCRIPT-->', `
  //   <script type="module">
  //     ${amdResult.code}
  //   </script>
  // `)
  // const iframe = document.createElement('iframe');
  // iframe.srcdoc = html;

  // const app = document.querySelector('#app');
  // app?.appendChild(iframe);
}


main()
