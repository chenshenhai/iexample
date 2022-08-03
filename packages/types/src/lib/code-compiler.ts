import type { CodeDirectory, CodeCompiledFiles } from './code-file';

export type CodeProjectType = 'vue' | 'react';

export interface CodeProjectCompiler<T extends CodeProjectType> {
  getType(): T;
  setFiles(dir: CodeDirectory): void;
  setEntryPath(path: string): void;
  compile(): CodeCompiledFiles;
  updateFileContent(path: string, content: string): CodeCompiledFiles;

  // TODO
  // on(name: string, callback: Function): void;
  // addFile(file: CodeFile): void;
  // deleteFile(path: string): void;
}
