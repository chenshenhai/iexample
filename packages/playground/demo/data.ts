import type { CodeDirectory, DocDirectory } from '@iexample/types';

// export const codeDirectory: CodeDirectory = [
//   {
//     name: 'index.js',
//     path: '/index.js',
//     content: `
// let a = 1;
// let b = 2;
// function add(a, b) {
//   return a + b;
// }
// console.log(add(a, b))
// `,
//     type: 'file',
//     fileType: 'javascript',
//     codeType: 'javascript'
//   },
//   {
//     name: 'index.css',
//     path: '/index.css',
//     content: `
// html, body {
//   margin: 0;
//   padding: 0;
// }
// .title {
//   font-size: 32px;
//   font-weight: bolder;
//   color: #666666;
// }
// `,
//     type: 'file',
//     fileType: 'css',
//     codeType: 'css'
//   },
//   //   {
//   //     name: 'index.html',
//   //     path: '/index.html',
//   //     content: `
//   // <div class="title">Hello World</div>
//   // <div id="root"></div>
//   // `,
//   //     type: 'file',
//   //     fileType: 'html',
//   //   }
//   {
//     name: 'index.html',
//     path: '/index.html',
//     content: `
// <html>
//   <head>
//     <link rel="stylesheet" href="./index.css" />
//   </head>
//   <body>
//     <div class="title">Hello World</div>
//     <div id="root"></div>
//   </body>
//   <script src="./index.js"></script>
// </html>
// `,
//     type: 'file',
//     fileType: 'html',
//     codeType: 'html'
//   }
// ];

// export const codeDirectory2: CodeDirectory = [
//   {
//     name: 'demo.html',
//     path: '/demo.html',
//     content: `
// <html>
//   <head>
//     <link rel="stylesheet" href="./index.css" />
//   </head>
//   <body>
//     <div class="title">Hello Demo2</div>
//     <div id="root"></div>
//   </body>
//   <script src="./index.js"></script>
// </html>
// `,
//     type: 'file',
//     fileType: 'html',
//     codeType: 'html'
//   },
//   {
//     name: 'index.js',
//     path: '/index.js',
//     content: `
// let a = 3;
// let b = 4;
// function add(a, b) {
//   return a + b;
// }
// console.log(add(a, b))
// `,
//     type: 'file',
//     fileType: 'javascript',
//     codeType: 'javascript'
//   },
//   {
//     name: 'index.css',
//     path: '/index.css',
//     content: `
// .title {
//   font-size: 32px;
//   font-weight: bolder;
//   color: #e91e63;
// }
// html, body {
//   margin: 0;
//   padding: 0;
// }
// `,
//     type: 'file',
//     fileType: 'css',
//     codeType: 'css'
//   }
//   //   {
//   //     name: 'index.html',
//   //     path: '/index.html',
//   //     content: `
//   // <div class="title">Hello World</div>
//   // <div id="root"></div>
//   // `,
//   //     type: 'file',
//   //     fileType: 'html',
//   //   }
// ];

export const docDirectory: DocDirectory = [0, 1, 2].map((i) => {
  return {
    path: [`item-xxxxxx-${i}`].join('/'),
    name: `item-xxxxxx-${i}`,
    children: [0, 1, 2, 3].map((j) => {
      return {
        path: [`item-xxxxxx-${i}`, `item-xxxxxx-${i}-${j}`].join('/'),
        name: `item-xxxxxx-${i}-${j}`,
        children: [0, 1, 2, 3, 4].map((k) => {
          return {
            path: [
              `item-xxxxxx-${i}`,
              `item-xxxxxx-${i}-${j}`,
              `item-xxxxxx-${i}-${j}-${k}`
            ].join('/'),
            name: `item-xxxxxx-${i}-${j}-${k}`,
            children: []
          };
        })
      };
    })
  };
});
