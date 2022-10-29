
<!-- 
  iexample-type: react
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
    <script type="module" src="./src/app.tsx"></script>
  </body>
</html>



```

## Main File
<!-- iexample-file: "@/src/app.tsx" -->
```tsx
import React, { useState } from 'react';
import './lib/log';
import ReactDOM, { createRoot } from 'react-dom';
import Counter from './lib/counter';
import './app.css';

const App = () => {
  return (
    <div className='main'>
      <h1>$$Hello_Demo$$</h1>
      <div>Hello Counter</div>
      <Counter />
    </div>
  )
}

const root = createRoot(document.querySelector('#app'));
root.render(<App />)
```

## CSS File

<!-- iexample-file: "@/src/app.css" -->
```css
.main {
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  color: #666666;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
```


## Lib Files

<!-- iexample-file: "@/src/lib/counter.tsx" -->
```tsx
import React, { useState } from 'react';
import { add } from '../util/add';

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className='hello'>
      <div>{count}</div>
      <button onClick={() => {
        setCount(add(count));
      }}>Add +</button>
    </div>
  )
}

export default Counter;
```


<!-- iexample-file: "@/src/lib/log.ts" -->
```ts
console.log('Hello Log!');
```

## Util Files

<!-- iexample-file: "@/src/util/add.ts" -->
```tsx
export const add = (num: number) => {
  return num + 1;
}
```

