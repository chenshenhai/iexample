import { compileVueFileStr } from '../src';

function main() {
  console.log('main-----')

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

  const result = compileVueFileStr(source, { filename: 'hello.vue' })
  console.log('result ===', result)
}

main();