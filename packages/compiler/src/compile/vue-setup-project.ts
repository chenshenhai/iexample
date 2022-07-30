import type {
  CodeCompiledFiles, CodeCompiledFile, CodeDirectory, CodeFile, CodeFolder,
} from '@iexample/types';
import { compileVueSetupFile, } from './vue-setup-file';
import { compileCodeToAMD } from './amd';
import { transform } from '../util/babel-standalone/babel';
import { getFolderPath } from '../util/path';


interface ModuleInfo {
  path: string,
  name: string | null,
  deps: Array<string | null>
}

function getAllFilePaths(dir: CodeDirectory,) {
  const paths: string[] = [];
  const _read = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      paths.push(file.path);
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _read(item)
      })
    }
  }
  dir.forEach((item: CodeFile | CodeFolder) => {
    _read(item);
  });
  return paths;
}

export const compileVueSetupProject = (
  dir: CodeDirectory,
  opts: {
    entryPath: string,
  }
): CodeCompiledFiles => {
  const compiledList: CodeCompiledFiles = [];
  const modInfos: ModuleInfo[] = [];
  const allFilePaths = getAllFilePaths(dir);

  const _compileFile = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      let compiledContent: string | null = null;
      if (['vue', 'javascript', 'typescript'].includes(file.codeType)) {

        if (file.codeType === 'vue') {
          try {
            const codeResult = compileVueSetupFile(file.content, { filename: file.name });
            const amdResult = compileCodeToAMD(codeResult.js, {
              id: file.path,
              filename: file.name,
              baseFolderPath: getFolderPath(file.path),
              resolveImportPath: true,
              allFilePaths,
            });
            if (amdResult?.ast?.type === 'ExpressionStatement' && Array.isArray(amdResult?.ast?.expression?.arguments)) {
              const info: ModuleInfo = {
                path: file.path,
                name: null,
                deps: []
              }
              const args = amdResult.ast.expression.arguments;
              args.forEach((item: any) => {
                if (item?.type === 'StringLiteral' && typeof item.value === 'string') {
                  info.name = item.value;
                } else if (item?.type === 'ArrayExpression' && Array.isArray(item?.elements)) {
                  item.elements.forEach((ele: any) => {
                    if (ele?.type === 'StringLiteral' &&  typeof ele?.value === 'string') {
                      info.deps.push(ele.value as string)
                    } else {
                      info.deps.push(null);
                    }
                  });
                }
              });
              modInfos.push(info);
            }
            compiledContent = amdResult.code;
          } catch (err) {
            // TODO
            console.warn(err);
          }
          const compiledFile: CodeCompiledFile = {
            path: file.path,
            name: file.name,
            type: 'file',
            content: file.content,
            codeType: file.codeType,
            fileType: file.fileType,
            compiledContent: compiledContent,
          }
          compiledList.push(compiledFile);
        } else {
          try {
            const codeResult = transform(file.content, {
              filename: '_temp_.ts',
              babelrc: false,
              presets: [
                ['typescript', {
                  allExtensions:true,
                  isTSX: true,
                }]
              ],
            })
            const amdResult = compileCodeToAMD(codeResult?.code || '', {
              id: file.path,
              filename: file.name,
              baseFolderPath: getFolderPath(file.path),
              resolveImportPath: true,
              allFilePaths,
            });
            if (amdResult?.ast?.type === 'ExpressionStatement' && Array.isArray(amdResult?.ast?.expression?.arguments)) {
              const info: ModuleInfo = {
                path: file.path,
                name: null,
                deps: []
              }
              const args = amdResult.ast.expression.arguments;
              args.forEach((item: any) => {
                if (item?.type === 'StringLiteral' && typeof item.value === 'string') {
                  info.name = item.value;
                } else if (item?.type === 'ArrayExpression' && Array.isArray(item?.elements)) {
                  item.elements.forEach((ele: any) => {
                    if (ele?.type === 'StringLiteral' &&  typeof ele?.value === 'string') {
                      info.deps.push(ele.value as string)
                    } else {
                      info.deps.push(null);
                    }
                  });
                }
              });
              modInfos.push(info);
            }
            compiledContent = amdResult.code;
          } catch (err) {
            // TODO
            console.warn(err);
          }
          const compiledFile: CodeCompiledFile = {
            path: file.path,
            name: file.name,
            type: 'file',
            content: file.content,
            codeType: file.codeType,
            fileType: file.fileType,
            compiledContent: compiledContent,
          }
          compiledList.push(compiledFile);
        }
      }
      
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _compileFile(item)
      })
    }
  }
  dir.forEach((item: CodeFile | CodeFolder) => {
    _compileFile(item);
  });

  // reset index for compiled files;
  const needPathList: string[] = [];
  const result: CodeCompiledFiles = [];
  const depsMapByPath : {
    [path: string]: (string | null)[]
  } = {};
  modInfos.forEach((mod: ModuleInfo) => {
    depsMapByPath[mod.path] = mod.deps
  })
  const _readDeps = (path: string) => {
    if (!needPathList.includes(path) && depsMapByPath?.[path]) {
      needPathList.unshift(path);
    }
    const deps = depsMapByPath?.[path];
    if (Array.isArray(deps)) {
      deps.forEach((i: string | null) => {
        if (typeof i === 'string') {
          _readDeps(i);
        }
      })
    }
  }
  _readDeps(opts.entryPath);

  const compiledfileMapByPath: {
    [path: string]: CodeCompiledFile
  } = {};
  compiledList.forEach((file) => {
    compiledfileMapByPath[file.path] = file;
  })

  needPathList.forEach((path: string) => {
    if (compiledfileMapByPath[path]) {
      result.push(compiledfileMapByPath[path]);
    }
  });
  
  return result;
}