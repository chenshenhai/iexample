declare type PlaygroundTheme = 'light' | 'dark';

declare type CodeType = 'javascript' | 'typescript' | 'json' | 'html' | 'css' | 'plaintext';

// declare interface IProject {
//   name: string;
// }

declare interface CodeFile {
  path: string;
  name: string;
  type: 'file';
  content: string;
  fileType: CodeType;
}

declare interface CodeFolder extends Omit<CodeFile, 'type'> {
  type: 'folder',
  children: Array<CodeFile | CodeFolder>;
}

declare type CodeDirectory = Array<CodeFolder | CodeFile>

declare type IResultStatus = 'LOADING' | 'LOADED' | 'NOT_FOUND' | 'NOT_FINISHED'


declare interface DocFile {
  name: string,
  path: string,
  children?: DocFile[]
}

declare type DocDirectory = Array<DocFile>