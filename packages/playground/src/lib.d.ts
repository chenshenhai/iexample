declare type IPlaygroundTheme = 'light' | 'dark';

declare type ICodeType = 'javascript' | 'typescript' | 'json' | 'html' | 'css' | 'plaintext';

// declare interface IProject {
//   name: string;
// }

declare interface IProjectFile {
  name: string;
  path: string;
  type: 'file',
  content: string;
  fileType: ICodeType,
}

declare interface IProjectFolder extends Omit<IProjectFile, 'type'> {
  type: 'folder',
  children: Array<IProjectFile | IProjectFolder>;
}

declare type IProjectDirectory = Array<IProjectFolder | IProjectFile>