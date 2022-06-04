export function formatPath(path: string): string {
  if (path.startsWith('./')) {
    return path.replace(/^.\//, '');
  }
  if (path.startsWith('/')) {
    return path.replace(/^\//, '');
  }
  return path;
}


export function formatDirectory<T extends CodeDirectory | DocDirectory>(directory: T): T {
  directory.forEach((file) => {
    file.path = formatPath(file.path);
  });
  return directory;
}
