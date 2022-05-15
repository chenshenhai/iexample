import { createApp } from 'vue';
// import { add } from '@iexample/util';
import Playground from '../src/index';

const app = createApp(Playground)
app.mount('#app');

fetch('/example/public/data.json')
.then(res => res.json()).then(console.log)