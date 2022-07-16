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

export interface CodeCompiledFile extends CodeFile {
  fullPath: string,
  compiledContent: string,
  additionalFiles: Omit<CodeCompiledFile, 'additionalFile'>[],
}

export interface CodeCompiledFolder {
  path: string;
  fullPath: string,
  name: string;
  type: 'folder';
  children?: Array<CodeCompiledFile | CodeCompiledFolder>;
}


export type CodeDirectory = Array<CodeFile | CodeCompiledFolder>;


export type CodeCompiledDirectory = Array<CodeCompiledFile | CodeCompiledFolder>;