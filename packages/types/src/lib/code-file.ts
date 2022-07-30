export type CodeType =
  | 'react'
  | 'vue'
  | 'javascript' 
  | 'typescript'
  | 'json'
  | 'html'
  | 'css'
  | 'text';

export type CodeFileType =
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'html'
  | 'css'
  | 'plaintext';


export interface CodeFile {
  path: string;
  name: string;
  type: 'file'
  content: string;
  codeType: CodeType,
  fileType: CodeFileType;
}

export interface CodeFolder {
  path: string;
  name: string;
  type: 'folder';
  children?: Array<CodeFile | CodeFolder>;
}

export interface CodeCompiledAdditionalFile {
  path: string;
  name: string;
  type: 'file'
  content: string;
  compiledContent: string
  codeType: 'css', // TODO
  fileType: CodeFileType;
}

export interface CodeCompiledFile extends CodeFile {
  compiledContent: string | null,
  additionalFiles?: CodeCompiledAdditionalFile[],
}

export type CodeDirectory = Array<CodeFile | CodeFolder>;


export type CodeCompiledFiles = Array<CodeCompiledFile>;