
<!-- 
  iexample-type: vue
  iexample-project-001: 111
  iexample-project-002: 222
-->
# $$Hello_Demo$$

## HTML

<!-- "iexample-file": "@/index.html" -->

```html
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3.2.37/dist/vue.runtime.esm-browser.js",
          "react": "https://jspm.dev/react",
          "react-dom": "https://jspm.dev/react-dom"
        }
      }
    </script>
    <style>
      html,body {
        margin: 0;
        padding: 0;
        background: #f0f0f0;
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>

    <div id="app">Loading...</div>
    <div id="app2">Loading2...</div>

    <script type="module" src="./src/index.ts"></script>
    <script type="module" src="./src/index2.ts"></script>
  </body>
</html>
```

## Main Files
<!-- iexample-file: "@/src/index.ts" -->
```tsx
import * as Vue from 'vue';
import App from './lib/app.vue';

const { createApp } = Vue;

const run = () => {
  App.name = 'App'
  const app = createApp(App)
  app.mount('#app')
}
run();
```

<!-- iexample-file: "@/src/index2.ts" -->
```tsx
import * as Vue from 'vue';
import App from './lib/app2.vue';

const { createApp } = Vue;

const run = () => {
  App.name = 'App';
  const app = createApp(App);
  app.mount('#app2');
};
run();
```

## Lib Files

<!-- iexample-file: "@/src/lib/app.vue" -->
```html
<template>
  <div class="app">
    <NumComponent :num="num" />
    <button class="btn" @click="click">Add +1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NumComponent from './num.vue';
import { add } from '../util/add';
const num = ref(0);
const click = () => {
  num.value = add(num.value);
};
</script>

<style>
.app {
  width: 200px;
  margin: 0 auto;
  padding: 0;
  color: #666666;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.btn {
  font-size: 16px;
  padding: 0 10px;
  height: 24px;
  cursor: pointer;
}
</style>

```


<!-- iexample-file: "@/src/lib/app2.vue" -->
```html
<template>
  <div class="app">
    <NumComponent :num="num" />
    <button class="btn" @click="click">Add +2</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NumComponent from './num.vue';
import { add } from '../util/add2';
const num = ref(0);
const click = () => {
  num.value = add(num.value);
};
</script>

<style>
.app {
  width: 200px;
  margin: 0 auto;
  padding: 0;
  color: #666666;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.btn {
  font-size: 16px;
  padding: 0 10px;
  height: 24px;
  cursor: pointer;
}
</style>
```


<!-- iexample-file: "@/src/lib/app2.vue" -->
```html
<template>
  <div class="app">
    <NumComponent :num="num" />
    <button class="btn" @click="click">Add + 2</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NumComponent from './num.vue';
import { add } from '../util/add2';
const num = ref(0);
const click = () => {
  num.value = add(num.value);
};
</script>

<style>
.app {
  width: 200px;
  margin: 0 auto;
  padding: 0;
  color: #666666;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.btn {
  font-size: 16px;
  padding: 0 10px;
  height: 24px;
  cursor: pointer;
}
</style>

```


## Lib Files

<!-- iexample-file: "@/src/lib/counter.vue" -->
```html
<template>
  <div class="num">{{ props.num }}</div>
</template>

<script setup>
  const props = defineProps({
    num: Number
  });
</script>

<style>
.num {
  font-size: 30px;
}
</style>
```

<!-- iexample-file: "@/src/lib/num.vue" -->
```html
<template>
  <div class="num">{{ props.num }}</div>
</template>

<script setup>
  const props = defineProps({
    num: Number
  });
</script>

<style>
.num {
  font-size: 30px;
}
</style>
```

## Util Files


<!-- iexample-file: "@/src/util/add.ts" -->
```ts
export const add = (num: number) => {
  return num + 1;
}
```

<!-- iexample-file: "@/src/util/add2.ts" -->
```ts
export const add = (num: number) => {
  return num + 2;
};

```
 

