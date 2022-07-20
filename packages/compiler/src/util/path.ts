import { ROOT_PATH } from '../config';

export function isAbsolutePath(path: string) {
  if (typeof path === 'string' && path.startsWith(`${ROOT_PATH}/`)) {
    return true;
  }
  return false;
}

export function joinPath(basePath: string, lastPath: string): string {
  const baseList = getPathList(basePath);
  const lastList = getPathList(lastPath);
  const pathList: string[] = [];
  baseList.forEach((item) => {
    if (item === '..' && pathList.length > 0) {
      pathList.pop();
    } else if(item.length > 0 && item !== '.') {
      pathList.push(item);
    }
  });
  lastList.forEach((item) => {
    if (item === '..' && pathList.length > 0) {
      pathList.pop();
    } else if(item.length > 0 && item !== '.') {
      pathList.push(item);
    }
  });
  const path = pathList.join('/');
  return path;
}

export function getPathList(path: string): string[] {
  if (typeof path !== 'string') {
    return [];
  }
  const pathList = path.split('/');
  if (pathList.length > 0 && pathList[pathList.length - 1] === '') {
    pathList.pop();
  }
  return pathList;
}

export function getFolderPath(path: string): string {
  if (typeof path !== 'string') {
    return path;
  }
  const pathList = path.split('/');
  pathList.pop();
  const folderPath = pathList.join('/');
  return folderPath;
}

export function hasExtensionName(path: string) {
  if (typeof path === 'string' && /\.[0-9a-zA-Z\-\_]{1,}$/.test(path)) {
    return true;
  }
  return false;
}