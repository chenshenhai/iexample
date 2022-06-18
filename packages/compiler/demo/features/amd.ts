import { compileCodeToAMD } from '../../src';
// @ts-ignore
import tpl from './amd-tpl.html?raw';
// @ts-ignore
import defineLib from '../define.js?raw';

const appCode = `
import React from 'react';
const App = () => {
  return React.createElement(
    'div',
    { className: 'box' },
    React.createElement(
      'h1',
      { className: 'box' },
      "Hello World!"
    )
  )
}
export default App;
`

const appId = "@/components/app"

const mainCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from "${appId}";

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(React.createElement(App, {}))
`

const appResult = compileCodeToAMD(appCode, {
  id: appId
});
const mainResult = compileCodeToAMD(mainCode);

// console.log('appResult ===', appResult)

const html = tpl.replace('<!--INJECT_SCRIPT_LIB-->', `
<script>
${defineLib}
</script>
`).replace('<!--INJECT_SCRIPT-->', `
<script type="module">
${appResult.code}
</script>
<script type="module">
${mainResult.code}
</script>
`)

const iframe = document.createElement('iframe');
iframe.srcdoc = html;

const app = document.querySelector('#app');
app?.appendChild(iframe);