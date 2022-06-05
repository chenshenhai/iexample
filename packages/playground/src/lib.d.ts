declare type PlaygroundTheme = 'light' | 'dark';

declare type CodeType = 'javascript' | 'typescript' | 'json' | 'html' | 'css' | 'plaintext';

// declare interface IProject {
//   name: string;
// }

declare interface CodeFile {
  path: string;
  name: string;
  type: 'file' | 'folder';
  content: string;
  fileType: CodeType;
  children: Array<CodeFile>;
}


declare type CodeDirectory = Array<CodeFile>

declare type IResultStatus = 'LOADING' | 'LOADED' | 'NOT_FOUND' | 'NOT_FINISHED'


declare interface DocFile {
  name: string,
  path: string,
  children?: DocFile[]
}

declare type DocDirectory = Array<DocFile>