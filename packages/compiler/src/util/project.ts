import type {
  CodeDirectory,
  CodeFile,
  CodeFolder,
  CodeCompiledFiles
} from '@iexample/types';
import { joinPath, getFolderPath } from './path';

export function updateFileContent(
  dir: CodeDirectory,
  path: string,
  content: string
): CodeDirectory {
  let hasUpdated = false;
  const _update = (file: CodeFile | CodeFolder) => {
    if (hasUpdated === true) {
      return;
    }
    if (file.type === 'file') {
      if (file.path === path) {
        file.content = content;
        hasUpdated = true;
      }
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _update(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _update(item);
  });
  return dir;
}

export function findFileContent(
  dir: CodeDirectory,
  path: string
): null | string {
  let content: null | string = null;
  const _find = (file: CodeFile | CodeFolder) => {
    if (content) {
      return;
    }
    if (file.type === 'file') {
      if (file.path === path) {
        content = file.content;
      }
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _find(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _find(item);
  });
  return content;
}

export function flatDirectory(dir: CodeDirectory): CodeFile[] {
  const files: CodeFile[] = [];
  const _read = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      files.push({ ...file });
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _read(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _read(item);
  });
  return files;
}

export function flatDirectoryToMap(dir: CodeDirectory): {
  [path: string]: CodeFile;
} {
  const fileMap: {
    [path: string]: CodeFile;
  } = {};
  const _read = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      fileMap[file.path] = { ...file };
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _read(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _read(item);
  });
  return fileMap;
}

export function parseEntryListFromPage(
  html: string,
  pagePath: string
): string[] {
  const entryList: string[] = [];
  const folderPath = getFolderPath(pagePath);
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html, 'text/html');
  const scripts: NodeListOf<HTMLScriptElement> = doc.querySelectorAll(
    'script[type="module"]'
  );
  scripts.forEach((script: HTMLScriptElement) => {
    const src = script.getAttribute('src');
    if (
      typeof src === 'string' &&
      !src.startsWith('//') &&
      (src.startsWith('./') || src.startsWith('../') || src.startsWith('/'))
    ) {
      const entry = joinPath(folderPath, src);
      entryList.push(entry);
    }
  });
  return entryList;
}

export function convertPreviewPage(
  html: string,
  pagePath: string,
  codeCompiledFiles: CodeCompiledFiles
): string[] {
  const entryList: string[] = [];
  const foderPath = getFolderPath(pagePath);
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html, 'text/html');
  const scripts: NodeListOf<HTMLScriptElement> = doc.querySelectorAll(
    'script[type="module"]'
  );
  scripts.forEach((script: HTMLScriptElement) => {
    const src = script.getAttribute('src');
    if (
      typeof src === 'string' &&
      !src.startsWith('//') &&
      (src.startsWith('./') || src.startsWith('../') || src.startsWith('/'))
    ) {
      const entry = joinPath(foderPath, src);
      entryList.push(entry);
    }
  });
  return entryList;
}
