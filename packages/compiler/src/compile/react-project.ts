import type {
  CodeCompiledFiles, CodeCompiledFile, CodeDirectory, CodeFile, CodeFolder,
} from '@iexample/types';
import { compileReactFile, } from './react-file';
import { compileCodeToAMD } from './amd';
// import { transform } from '../util/babel-standalone/babel';
import { getFolderPath } from '../util/path';
import { sortProjectCompiledFiles, sortProjectPathList } from './sort';
import type { ModuleInfo } from './sort';

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

export const compileReactProject = (
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
      if (['react', 'javascript', 'typescript'].includes(file.codeType)) {
        try {
          const reactResult = compileReactFile(file.content, { filename: file.name });
          const amdResult = compileCodeToAMD(reactResult.code, {
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
  const needPathList = sortProjectPathList(opts.entryPath, modInfos);
  const result = sortProjectCompiledFiles(compiledList, needPathList)
  return result;
}