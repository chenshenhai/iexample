import '../src/lib.d';

import { createApp } from 'vue';
// import { add } from '@iexample/util';
import App from './app.vue';


const app = createApp(App, {})
app.mount('#app');

// fetch('/example/public/data.json')
// .then(res => res.json()).then(console.log)