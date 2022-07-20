 // import { createApp } from "vue"
 import * as Vue from 'vue';
 import Mod from './simple.vue';
 
 const { createApp } = Vue;

 const run = () => {
   Mod.name = 'Repl'
   const app = createApp(Mod)
   app.mount('#app')
 }
 run();