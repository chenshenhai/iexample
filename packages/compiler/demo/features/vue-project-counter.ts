/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeVueIndex from './codes/vue/counter/index.ts?raw';
import codeVueIndex2 from './codes/vue/counter/index2.ts?raw';
import codeVueUtilAdd from './codes/vue/counter/util/add.ts?raw';
import codeVueUtilAdd2 from './codes/vue/counter/util/add2.ts?raw';
import codeVueLibNum from './codes/vue/counter/lib/num.vue?raw';
import codeVueLibApp from './codes/vue/counter/lib/app.vue?raw';
import codeVueLibApp2 from './codes/vue/counter/lib/app2.vue?raw';
import tpl from './tpl.html?raw';
import {
  VueSetupProjectCompiler,
  parseCompiledJsCodeList,
  parseCompiledCssCodeList
} from '../../src';
import type { CodeDirectory } from '@iexample/types';

const dir: CodeDirectory = [
  {
    path: '@/util',
    name: 'util',
    type: 'folder',
    children: [
      {
        path: '@/util/add.ts',
        name: 'add.ts',
        type: 'file',
        content: codeVueUtilAdd,
        codeType: 'typescript',
        fileType: 'typescript'
      },
      {
        path: '@/util/add2.ts',
        name: 'add2.ts',
        type: 'file',
        content: codeVueUtilAdd2,
        codeType: 'typescript',
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
        path: '@/lib/num.vue',
        name: 'num.vue',
        type: 'file',
        content: codeVueLibNum,
        codeType: 'vue',
        fileType: 'html'
      },
      {
        path: '@/lib/app.vue',
        name: 'app.vue',
        type: 'file',
        content: codeVueLibApp,
        codeType: 'vue',
        fileType: 'html'
      },
      {
        path: '@/lib/app2.vue',
        name: 'app2.vue',
        type: 'file',
        content: codeVueLibApp2,
        codeType: 'vue',
        fileType: 'html'
      }
    ]
  },
  {
    path: '@/index.ts',
    name: 'index.ts',
    type: 'file',
    content: codeVueIndex,
    codeType: 'typescript',
    fileType: 'typescript'
  },
  {
    path: '@/index2.ts',
    name: 'index2.ts',
    type: 'file',
    content: codeVueIndex2,
    codeType: 'typescript',
    fileType: 'typescript'
  }
];

function main() {
  console.log('dir ====', dir);
  const compiler = new VueSetupProjectCompiler();
  compiler.setFiles(dir);
  compiler.setEntryList(['@/index.ts', '@/index2.ts']);
  const compiledFiles = compiler.compile();

  console.log('compiledFiles ====', compiledFiles);
  // const source = simpleReactCode;
  // compiledDir.reverse();
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
