import CodeMirror from 'codemirror';

declare namespace Types {
  type ICodeEditor = typeof CodeMirror & {}
}

export = Types;

export as namespace Types;


