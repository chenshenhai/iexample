import type { CodeDirectory, CodeFile, CodeFolder } from '@iexample/types';

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
