/// <reference types="vite/client" />
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import codeVueIndex from './codes/vue/counter/index.ts?raw';
import codeVueUtilAdd from './codes/vue/counter/util/add.ts?raw';
import codeVueLibNum from './codes/vue/counter/lib/num.vue?raw';
import codeVueLibApp from './codes/vue/counter/lib/app.vue?raw';
import tpl from './tpl.html?raw';
import { compileVueSetupProject } from '../../src';
import type { CodeDirectory } from '@iexample/types'

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
        path: '@/lib/num.vue',
        name: 'num.vue',
        type: 'file',
        content: codeVueLibNum,
        codeType: 'vue',
        fileType: 'html',
      }, 
      {
        path: '@/lib/app.vue',
        name: 'app.vue',
        type: 'file',
        content: codeVueLibApp,
        codeType: 'vue',
        fileType: 'html',
      },
    ]
  },
  {
    path: '@/index.ts',
    name: 'index.ts',
    type: 'file',
    content: codeVueIndex,
    codeType: 'typescript',
    fileType: 'typescript',
  },
]

function main() {

  console.log('dir ====', dir);
  const compiledDir = compileVueSetupProject(dir, { entryPath: '@/index.ts' });
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
