import type { CodeCompiledFiles, CodeCompiledFile } from '@iexample/types';

export function sortProjectCompiledFiles(
  compiledList: CodeCompiledFiles,
  needPathList: string[]
): CodeCompiledFiles {
  const compiledfileMapByPath: {
    [path: string]: CodeCompiledFile;
  } = {};

  const result: CodeCompiledFiles = [];
  compiledList.forEach((file) => {
    compiledfileMapByPath[file.path] = file;
  });

  needPathList.forEach((path: string) => {
    if (compiledfileMapByPath[path]) {
      result.push(compiledfileMapByPath[path]);
    }
  });
  return result;
}

export interface ModuleInfo {
  path: string;
  name: string | null;
  deps: Array<string | null>;
}

export function sortProjectPathList(
  entryList: string[],
  modInfos: ModuleInfo[]
): string[] {
  console.log('entryList ====', entryList);
  console.log('modInfos ====', modInfos);

  // reset index for compiled files;
  const needPathList: string[] = [];
  const depsMapByPath: {
    [path: string]: (string | null)[];
  } = {};
  modInfos.forEach((mod: ModuleInfo) => {
    depsMapByPath[mod.path] = mod.deps;
  });
  const _readDeps = (path: string) => {
    const deps = depsMapByPath?.[path];
    if (Array.isArray(deps)) {
      deps.forEach((i: string | null) => {
        if (typeof i === 'string') {
          _readDeps(i);
        }
      });
    }
    if (!needPathList.includes(path) && depsMapByPath?.[path]) {
      needPathList.push(path);
    }
  };
  entryList.forEach((entry: string) => {
    _readDeps(entry);
  });
  return needPathList;
}
