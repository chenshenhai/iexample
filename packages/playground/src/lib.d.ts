declare type IPlaygroundTheme = 'light' | 'dark';

declare type ICodeType = 'javascript' | 'html' | 'css' | 'plaintext';

declare interface IProject {
  name: string;
  list: Array<{
    pathname: string
  }>
}

declare interface IProjectFile {
  title: string;
  key: string;
  type: 'file',
  fileType: ICodeType,
  isLeaf: boolean,
}

declare interface IProjectFolder extends Omit<IProjectFile, 'type'> {
  type: 'folder',
  title: string;
  key: string;
  children: Array<IProjectFile | IProjectFolder>;
}
