import '../src/lib.d';

import { createApp } from 'vue';
// import { add } from '@iexample/util';
import Playground from '../src/index';

const directory: IProjectDirectory = [
  {
    name: 'index.js',
    path: '/index.js',
    content: `
let a = 1;
let b = 2;
function add(a, b) {
  return a + b;
}
`,
    type: 'file',
    fileType: 'javascript',
  },
  {
    name: 'index.css',
    path: '/index.css',
    content: `
html, body {
  margin: 0;
  padding: 0;
}
.title {
  font-size: 32px;
  font-weight: bolder;
}
`,
    type: 'file',
    fileType: 'css',
  },
  {
    name: 'index.html',
    path: '/index.html',
    content: `
<html>
  <head>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="./index.js"></script>
</html>
`,
    type: 'file',
    fileType: 'html',
  }
]

const app = createApp(Playground, {
  theme: 'dark',
  directory,
})
app.mount('#app');

// fetch('/example/public/data.json')
// .then(res => res.json()).then(console.log)