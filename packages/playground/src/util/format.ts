import type { CodeDirectory, CodeFolder } from '../types';

export function formatPath(path: string): string {
  if (path.startsWith('./')) {
    return path.replace(/^.\//, '');
  }
  if (path.startsWith('/')) {
    return path.replace(/^\//, '');
  }
  return path;
}

export function formatDirectory<T extends CodeDirectory>(directory: T): T {
  directory.forEach((file) => {
    file.path = formatPath(file.path);
    const folder = file as CodeFolder;
    if (Array.isArray(folder?.children)) {
      formatDirectory(folder.children);
    }
  });
  return directory;
}
