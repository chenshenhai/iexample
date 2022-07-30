import type { CodeDirectory, CodeFile, CodeFolder } from '@iexample/types';

export function updateFileContent(
  dir: CodeDirectory, path: string, content: string
): CodeDirectory {
  let hasUpdated: boolean = false;
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
        _update(item)
      })
    }
  }
  dir.forEach((item: CodeFile | CodeFolder) => {
    _update(item);
  });
  return dir;
}