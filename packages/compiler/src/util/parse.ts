import type {
  CodeCompiledFiles,
  CodeCompiledFile,
  CodeCompiledAdditionalFile
} from '@iexample/types';

export function parseCompiledJsCodeList(files: CodeCompiledFiles): string[] {
  const jsList: string[] = [];
  files.forEach((file: CodeCompiledFile) => {
    if (['vue', 'react', 'javascript', 'typescript'].includes(file.codeType)) {
      if (typeof file.compiledContent === 'string') {
        jsList.push(file.compiledContent);
      }
    }
  });
  return jsList;
}

export function parseCompiledCssCodeList(files: CodeCompiledFiles): string[] {
  const cssList: string[] = [];
  files.forEach((file: CodeCompiledFile) => {
    if (Array.isArray(file.additionalFiles)) {
      file.additionalFiles.forEach((aFile: CodeCompiledAdditionalFile) => {
        if (['css'].includes(aFile.codeType)) {
          if (typeof aFile.compiledContent === 'string') {
            cssList.push(aFile.compiledContent);
          }
        }
      });
    }
  });
  return cssList;
}
