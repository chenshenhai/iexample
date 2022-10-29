import type CodeMirror from 'codemirror';

import type {
  CodeType,
  CodeFileType,
  CodeFile,
  CodeFolder,
  CodeDirectory,
  DocFile,
  DocDirectory
} from '@iexample/types';

export type {
  CodeType,
  CodeFileType,
  CodeFile,
  CodeFolder,
  CodeDirectory,
  DocFile,
  DocDirectory
};

export type ICodeEditor = typeof CodeMirror & {};

export type PlaygroundTheme = 'light' | 'dark';

export type IResultStatus = 'LOADING' | 'LOADED' | 'NOT_FOUND' | 'NOT_FINISHED';

export type DocMode = 'code' | 'markdown';

export interface SharedStore {
  docMode: DocMode;
}

export interface SharedCodeStore {
  codeDirectory: CodeDirectory;
  currentCodeFilePath: string | null;
  codeContent: string | null;
  codeType: CodeType;
}
