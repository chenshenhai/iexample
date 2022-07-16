import type { CodeType, CodeDirectory, CodeCompiledFolder } from './code-file';


export interface CodeCompiler<T extends CodeType> {
  getCodeType(): T;
  compile(dir: CodeDirectory): CodeCompiledFolder[]
  // TODO
}

