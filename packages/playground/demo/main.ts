import '../src/lib.d';

import { createApp } from 'vue';
// import { add } from '@iexample/util';
import Playground from '../src/index';

const codeDirectory: CodeDirectory = [
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


// const expandAll = true;
const  docDirectory = [0,1,2].map((i) => {
  return {
    id: `${i}`,
    text: `item-${i}`,
    path: [`item-${i}`].join('/'),
    children: [0,1,2,3].map((j) => {
      return {
        id: `${i}-${j}`,
        path: [`item-${i}`, `item-${i}-${j}`].join('/'),
        text: `item-${i}-${j}`,
        children:  [0,1,2,3,4].map((k) => {
          return {
            id: `${i}-${j}-${k}`,
            path: [`item-${i}`, `item-${i}-${j}`, `item-${i}-${j}-${k}`].join('/'),
            text: `item-${i}-${j}-${k}`,
            children: []
          }
        })
      }
    })
  };
})
// const select = (node) => {
//   if (!(node.children && node.children.length > 0)) {
//     state.selectedId = node.id;
//     console.log('node ===', node);
//   }
// };

const app = createApp(Playground, {
  theme: 'dark',

  // code
  codeDirectory,
  currentCodeFilePath: './index.html',
  entryCodeFilePath: '/index.html',

  // doc
  docDirectory,
  selectedDocFilePath: '',
  expandAllDocFiles: true,
})
app.mount('#app');

// fetch('/example/public/data.json')
// .then(res => res.json()).then(console.log)