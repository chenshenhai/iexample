type ICodeLanguage = 'javascript' | 'typescript' | 'json' | 'html' | 'css' | 'markdown' | 'plaintext';

interface IProjectInfo {
  name: string,
  folder: IProjectFolder["children"]
  question?: {
    title: string,
    options: {
      label: string,
      value: string,
    }[],
    answer: string,
  }
}

interface ICodeSelectedLine {
  start: number,
  end: number,
}

interface ICodeQuestion {
  id: string,
  projectId: string,
  // name: string,
  anwser: boolean | null,
}

interface IProjectFile {
  title: string;
  key: string;
  type: 'file',
  fileType: ICodeLanguage,
  isLeaf: boolean,
  selectedLines?: ICodeSelectedLine[]
}

interface IProjectFolder extends Omit<IProjectFile, 'type'> {
  type: 'folder',
  title: string;
  key: string;
  children: Array<IProjectFile | IProjectFolder>;
}


declare namespace Types {
  interface ProjectInfo extends IProjectInfo {}
  interface ProjectFile extends IProjectFile {}
  interface ProjectFolder extends IProjectFolder {}
  type CodeFolder = Array<IProjectFile | IProjectFolder>;
  type CodeLanguage = ICodeLanguage;
  type CodeSelectedLine = ICodeSelectedLine;
  type CodeQuestion = ICodeQuestion;
}



