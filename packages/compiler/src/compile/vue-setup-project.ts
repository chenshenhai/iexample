import type {
  CodeCompiledFiles,
  CodeCompiledFile,
  CodeDirectory,
  CodeFile,
  CodeFolder
} from '@iexample/types';
import { compileVueSetupFile } from './vue-setup-file';
import { compileCodeToAMD } from './amd';
import { transform } from '../util/babel-standalone/babel';
import { getFolderPath } from '../util/path';
import { sortProjectCompiledFiles, sortProjectPathList } from './sort';
import type { ModuleInfo } from './sort';

function getAllFilePaths(dir: CodeDirectory) {
  const paths: string[] = [];
  const _read = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      paths.push(file.path);
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _read(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _read(item);
  });
  return paths;
}

export const compileVueSetupProject = (
  dir: CodeDirectory,
  opts: {
    entryList: string[];
  }
): CodeCompiledFiles => {
  const compiledList: CodeCompiledFiles = [];
  const modInfos: ModuleInfo[] = [];
  const allFilePaths = getAllFilePaths(dir);

  const _compileFile = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      let compiledContent: string | null = null;
      let compiledCssContent: string | null = null;
      if (['vue', 'javascript', 'typescript'].includes(file.codeType)) {
        if (file.codeType === 'vue') {
          try {
            const codeResult = compileVueSetupFile(file.content, {
              filename: file.name
            });
            const amdResult = compileCodeToAMD(codeResult.js, {
              id: file.path,
              filename: file.name,
              baseFolderPath: getFolderPath(file.path),
              resolveImportPath: true,
              allFilePaths
            });
            if (
              amdResult?.ast?.type === 'ExpressionStatement' &&
              Array.isArray(amdResult?.ast?.expression?.arguments)
            ) {
              const info: ModuleInfo = {
                path: file.path,
                name: null,
                deps: []
              };
              const args = amdResult.ast.expression.arguments;
              args.forEach((item: any) => {
                if (
                  item?.type === 'StringLiteral' &&
                  typeof item.value === 'string'
                ) {
                  info.name = item.value;
                } else if (
                  item?.type === 'ArrayExpression' &&
                  Array.isArray(item?.elements)
                ) {
                  item.elements.forEach((ele: any) => {
                    if (
                      ele?.type === 'StringLiteral' &&
                      typeof ele?.value === 'string'
                    ) {
                      info.deps.push(ele.value as string);
                    } else {
                      info.deps.push(null);
                    }
                  });
                }
              });
              modInfos.push(info);
            }
            compiledContent = amdResult.code;
            compiledCssContent = codeResult.css;
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
            additionalFiles: []
          };
          if (typeof compiledCssContent === 'string') {
            compiledFile.additionalFiles?.push({
              path: `${file.path}.css`,
              name: `${file.name}.css`,
              type: 'file',
              content: compiledCssContent,
              codeType: 'css',
              fileType: 'css',
              compiledContent: compiledCssContent
            });
          }
          compiledList.push(compiledFile);
        } else {
          try {
            const codeResult = transform(file.content, {
              filename: '_temp_.ts',
              babelrc: false,
              presets: [
                [
                  'typescript',
                  {
                    allExtensions: true,
                    isTSX: true
                  }
                ]
              ]
            });
            const amdResult = compileCodeToAMD(codeResult?.code || '', {
              id: file.path,
              filename: file.name,
              baseFolderPath: getFolderPath(file.path),
              resolveImportPath: true,
              allFilePaths
            });
            if (
              amdResult?.ast?.type === 'ExpressionStatement' &&
              Array.isArray(amdResult?.ast?.expression?.arguments)
            ) {
              const info: ModuleInfo = {
                path: file.path,
                name: null,
                deps: []
              };
              const args = amdResult.ast.expression.arguments;
              args.forEach((item: any) => {
                if (
                  item?.type === 'StringLiteral' &&
                  typeof item.value === 'string'
                ) {
                  info.name = item.value;
                } else if (
                  item?.type === 'ArrayExpression' &&
                  Array.isArray(item?.elements)
                ) {
                  item.elements.forEach((ele: any) => {
                    if (
                      ele?.type === 'StringLiteral' &&
                      typeof ele?.value === 'string'
                    ) {
                      info.deps.push(ele.value as string);
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
            compiledContent: compiledContent
          };
          compiledList.push(compiledFile);
        }
      }
    } else if (file.type === 'folder') {
      file.children?.forEach((item) => {
        _compileFile(item);
      });
    }
  };
  dir.forEach((item: CodeFile | CodeFolder) => {
    _compileFile(item);
  });

  // reset index for compiled files;
  const needPathList = sortProjectPathList(opts.entryList, modInfos);

  const result = sortProjectCompiledFiles(compiledList, needPathList);
  return result;
};
