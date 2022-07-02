
// @ts-ignore
import defineLib from '@iexample/define/dist/index.umd.js?raw';
import { compileVueSetupFile } from '../../src';
import { compileCodeToAMD } from '../../src';
// @ts-ignore
import tpl from './vue-tpl.html?raw';

function main() {

  const modId = '@/module.vue';
  const modSource = `
  <template>
    <h1 class="title">{{ msg }}</h1>
    <input v-model="msg">
  </template>
  <script setup>
  import { ref } from 'vue'

  const msg = ref('Hello World!')
  </script>
  <style scoped>
  .title { color: #666666; }
  </style>
  `;

  const appSource = `
  import Vue from "vue"
  const { createApp } = Vue;
  import Mod from "${modId}"
  const run = () => {
    Mod.name = 'Repl'
    const app = createApp(Mod)
    app.mount('#app')
  }
  run();
  `

  const result = compileVueSetupFile(modSource, { filename: 'hello.vue' });

  console.log('result.code  ===', result.js)
  const modResult = compileCodeToAMD(result.js, { id: modId });
  // // const appResult = compileCodeToAMD(appSource);
  console.log('modResult.code ====', modResult)

  // const html = tpl
  //   .replace('<!--INJECT_SCRIPT_LIB-->', `
  //   <script>
  //   ${defineLib}
  //   </script>
  //   `)
  //   .replace('<!--INJECT_SCRIPT-->', `
  //   <script type="module">
  //     ${modResult.code}
  //   </script>
  //   <script type="module">
  //    ${appResult.code}
  //   </script>
  // `).replace('<!--INJECT_STYLE-->', `
  // <style>
  //   ${result.css}
  // </style>
  // `)
  
  // const iframe = document.createElement('iframe');
  // iframe.srcdoc = html;

  // const app = document.querySelector('#app');
  // app?.appendChild(iframe);

}


main()
