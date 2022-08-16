import type CodeMirror from 'codemirror';

export type {
  CodeType,
  CodeFileType,
  CodeFile,
  CodeDirectory,
  DocFile,
  DocDirectory
} from '@iexample/types';

export type ICodeEditor = typeof CodeMirror & {};

export type PlaygroundTheme = 'light' | 'dark';

export type IResultStatus = 'LOADING' | 'LOADED' | 'NOT_FOUND' | 'NOT_FINISHED';
