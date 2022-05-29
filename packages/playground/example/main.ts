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
console.log(add(a, b))
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
  color: #666666;
}
`,
    type: 'file',
    fileType: 'css',
  },
//   {
//     name: 'index.html',
//     path: '/index.html',
//     content: `
// <div class="title">Hello World</div>
// <div id="root"></div>
// `,
//     type: 'file',
//     fileType: 'html',
//   }
  {
    name: 'index.html',
    path: '/index.html',
    content: `
<html>
  <head>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div class="title">Hello World</div>
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
  currentFilePath: './index.html',
  entryPath: '/index.html'
})
app.mount('#app');

// fetch('/example/public/data.json')
// .then(res => res.json()).then(console.log)