import { compileVueSetupFile } from '../src';
import tpl from './tpl.html?raw';

function main() {
  const source = `
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

  const result = compileVueSetupFile(source, { filename: 'hello.vue' })
  console.log('result ===', result)
  const html = tpl.replace('<!--INJECT_SCRIPT-->', `
    <script type="module">
      ${result.js}
      window.___module___ = ___module___;
    </script>

    <script type="module">
      import { createApp } from "vue"
      const run = () => {
        const App = window.___module___ 
        App.name = 'Repl'
        const app = createApp(App)
        app.mount('#app')
      }
      run();
    </script>
  `).replace('<!--INJECT_SCRIPT-->', `
  <style>
    ${result.css}
  </style>
  `)
  
  const iframe = document.createElement('iframe');
  iframe.srcdoc = html;

  const app = document.querySelector('#app');
  app.appendChild(iframe);

}


main()
