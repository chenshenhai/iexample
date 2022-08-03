import type { CodeDirectory, DocDirectory } from '../types';

export function formatPath(path: string): string {
  if (path.startsWith('./')) {
    return path.replace(/^.\//, '');
  }
  if (path.startsWith('/')) {
    return path.replace(/^\//, '');
  }
  return path;
}

export function formatDirectory<T extends CodeDirectory | DocDirectory>(
  directory: T
): T {
  directory.forEach((file) => {
    file.path = formatPath(file.path);
    if (Array.isArray(file?.children)) {
      formatDirectory(file.children);
    }
  });
  return directory;
}
