export type CodeType =
  | 'javascript'
  | 'vue'
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
  compiledContent: string;
  codeType: CodeType,
  fileType: CodeFileType;
}

export interface CodeFolder {
  path: string;
  name: string;
  type: 'folder';
  children?: Array<CodeFile | CodeFolder>;
}


export type CodeDirectory = Array<CodeFile>;