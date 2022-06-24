import type { DocDirectory, DocFile } from "../types";

export function searchFileFormDocDirectory(
  path: string,
  directory: DocDirectory
): DocFile | null {
  let file: DocFile | null = null;

  const _search = (_path: string, _dir: DocDirectory) => {
    for (let i = 0; i < _dir.length; i++) {
      if (file != null) {
        break;
      }
      if (_dir[i]?.path === path) {
        file = _dir[i];
      }
      if (Array.isArray(_dir[i]?.children)) {
        _search(path, _dir[i]?.children || []);
      }
    }
  };
  _search(path, directory);
  return file;
}
