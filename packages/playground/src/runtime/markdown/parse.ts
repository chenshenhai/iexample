import { Lexer, marked } from 'marked';
import { parse as yamlParse } from 'yaml';
import type {} from 'marked';
import type {
  CodeDirectory,
  CodeFile,
  CodeFolder,
  CodeType,
  CodeFileType,
  ProjectType
} from '../../types';
import { KEY_TYPE, KEY_FILE } from './config';

const PROJECT_TYPES: ProjectType[] = [
  'react',
  'vue',
  'javascript',
  'typescript'
];

type TempFile = {
  __path__: string;
  __isFile__: boolean;
  __fileContent__: string;
};
type TempFolder = {
  [name: string]: TempFolder | TempFile;
} & {
  __path__: string;
  __isFolder__: boolean;
};
type TempFileMap = TempFolder & {};

const lexer = new Lexer();

function isHtmlAnnotationToken(token: marked.Token): boolean {
  if (token.type === 'html' && /^<!--[\s\S]*?-->$/.test(token?.text?.trim())) {
    return true;
  }
  return false;
}

function getHtmlAnnotationContent(html: string): string {
  const reg = /<!--([\s\S]*?)-->/;
  const execResult = reg.exec(html);
  const content = execResult?.[1] || '';
  return content;
}

function isValidFilePath(path: string): boolean {
  if (path.startsWith('@/') && /\.[a-z]{1,}$/.test(path)) {
    return true;
  }
  return false;
}

function getFileExtName(str: string): string {
  const reg = /\.([0-9a-zA-Z\-_]{1,})$/;
  const extname = reg.exec(str)?.[1] || '';
  return extname;
}

function getCodeTypeFromPath(
  path: string,
  projectType?: ProjectType
): CodeType {
  const extname = getFileExtName(path);
  if (['jsx', 'tsx'].includes(extname)) {
    if (projectType === 'vue') {
      return 'vue';
    }
    return 'react';
  }
  const codeTypeMap: {
    [name: string]: CodeType;
  } = {
    js: 'javascript',
    ts: 'typescript',
    css: 'css',
    json: 'json',
    html: 'html',
    txt: 'text',
    vue: 'vue'
  };
  if (codeTypeMap[extname]) {
    return codeTypeMap[extname];
  }
  return 'text';
}

function getFileTypeFromPath(
  path: string
  // projectType?: ProjectType
): CodeFileType {
  const extname = getFileExtName(path);
  if (['js', 'jsx', 'ts', 'tsx'].includes(extname)) {
    return 'typescript';
  }
  const fileTypeMap: {
    [name: string]: CodeFileType;
  } = {
    js: 'javascript',
    ts: 'typescript',
    css: 'css',
    json: 'json',
    html: 'html',
    txt: 'plaintext',
    vue: 'html'
  };
  if (fileTypeMap[extname]) {
    return fileTypeMap[extname];
  }
  return 'plaintext';
}

function appendFileToMap(
  filePath: string,
  content: string,
  tempMap: TempFileMap
) {
  if (!isValidFilePath(filePath)) {
    return;
  }
  const pathList = filePath.split('/');
  let targetMap: TempFileMap | any = tempMap;
  const currentPathList: string[] = [];
  while (pathList.length > 0) {
    const pathName: string = pathList.shift() as string;
    currentPathList.push(pathName);
    if (typeof pathName === 'string' && pathName) {
      if (pathList.length > 0) {
        if (!targetMap[pathName]) {
          targetMap[pathName] = {
            __isFolder__: true,
            __path__: currentPathList.join('/')
          };
        }
        targetMap = targetMap[pathName];
      } else if (targetMap[pathName]?.__isFolder__ !== true) {
        targetMap[pathName] = {
          __isFile__: true,
          __fileContent__: content,
          __path__: currentPathList.join('/')
        };
      }
    } else {
      break;
    }
  }
}

export function parseMarkdownProject(md: string): {
  dir: CodeDirectory;
  projectType: ProjectType;
} {
  const project: { dir: CodeDirectory; projectType: ProjectType } = {
    projectType: 'typescript',
    dir: []
  };
  const tokens: marked.TokensList = lexer.lex(md);
  const fileConfigMap = new Map<number, string>();

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (isHtmlAnnotationToken(tk)) {
      const content = getHtmlAnnotationContent(tk.raw);
      const config = yamlParse(content);
      if (
        typeof config?.[KEY_TYPE] === 'string' &&
        config?.[KEY_TYPE] &&
        PROJECT_TYPES.includes(config[KEY_TYPE] as ProjectType)
      ) {
        project.projectType = config[KEY_TYPE] as ProjectType;
      } else if (typeof config?.[KEY_FILE] === 'string' && config?.[KEY_FILE]) {
        fileConfigMap.set(i, config?.[KEY_FILE]);
      }
    }
  }

  const tempFileMap: TempFileMap = {
    __path__: '@/',
    __isFolder__: true
  } as TempFileMap;
  for (let i = 0; i < tokens.length; i++) {
    // const tk = tokens[i];
    if (tokens.length - 1 === 0) {
      break;
    }
    const nextTk = tokens[i + 1];
    if (fileConfigMap.has(i) && nextTk.type === 'code') {
      const filePath: string | undefined = fileConfigMap.get(i);
      const content: string = nextTk.text;
      if (typeof filePath === 'string') {
        appendFileToMap(filePath, content, tempFileMap);
        i++;
      }
    }
  }

  const _readTempFileMap = (
    targetCodeFolders: (CodeFolder | CodeFile)[],
    targeFileMap: TempFileMap
  ) => {
    if (targeFileMap?.__isFolder__ === true) {
      Object.keys(targeFileMap).forEach((name: string) => {
        if (
          name &&
          ['__isFolder__', '__isFile__', '__path__'].includes(name) !== true
        ) {
          const tempFile = targeFileMap[name] as TempFile;
          const tempFolder = targeFileMap[name] as TempFolder;
          if (tempFile?.__isFile__ === true) {
            const filePath = tempFile.__path__ || '';
            const codeFile: CodeFile = {
              path: filePath,
              name: filePath?.split('/')?.pop() || '',
              type: 'file',
              content: tempFile.__fileContent__,
              codeType: getCodeTypeFromPath(filePath),
              fileType: getFileTypeFromPath(filePath)
            };
            targetCodeFolders.push(codeFile);
          } else if (tempFolder?.__isFolder__ == true) {
            const filePath = tempFolder.__path__ || '';
            const codeFolder: CodeFolder = {
              path: filePath,
              name: filePath?.replace(/\/$/, '')?.split('/')?.pop() || '',
              type: 'folder',
              children: []
            };
            targetCodeFolders.push(codeFolder);
            _readTempFileMap(
              codeFolder.children as (CodeFolder | CodeFile)[],
              tempFolder
            );
          }
        }
      });
    }
  };

  const dir: CodeDirectory = [];
  _readTempFileMap(dir, tempFileMap['@'] as TempFileMap);
  const folderList: CodeFolder[] = [];
  const fileList: CodeFile[] = [];
  dir.forEach((item) => {
    if (item.type === 'folder') {
      folderList.push(item);
    } else {
      fileList.push(item);
    }
  });
  project.dir = [...folderList, ...fileList];

  return project;
}
