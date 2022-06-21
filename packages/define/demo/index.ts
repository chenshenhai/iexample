import define from '../src';

// @ts-ignore
window.define = define;

const appId = "@/components/app"

// define('react', () => {
//   // @ts-ignore
//   return window.React;
// })

// define('react-dom', () => {
//   // @ts-ignore
//   return window.ReactDOM;
// })

define(appId, ['react'], (React) => {
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
  return App
})

define(['react', 'react-dom', appId], (React, ReactDOM, App) => {
  const root = ReactDOM.createRoot(document.querySelector('#app'));
  root.render(React.createElement(App, {}))
})