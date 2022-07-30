import * as Vue from 'vue';
import App from './lib/app.vue';

const { createApp } = Vue;

const run = () => {
  App.name = 'App'
  const app = createApp(App)
  app.mount('#app')
}
run();