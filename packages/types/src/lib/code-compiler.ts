import type { CodeType, CodeDirectory, CodeCompiledFiles } from './code-file';


export interface CodeCompiler<T extends CodeType> {
  getCodeType(): T;
  compile(dir: CodeDirectory): CodeCompiledFiles
  // TODO
}

