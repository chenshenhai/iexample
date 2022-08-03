import type {
  CodeCompiledFiles,
  CodeCompiledFile,
  CodeDirectory,
  CodeFile,
  CodeFolder
} from '@iexample/types';
import { compileReactFile } from './react-file';
import { compileAstToAMD, compileCodeToAMD } from './amd';
// import { transform } from '../util/babel-standalone/babel';
import { getFolderPath } from '../util/path';
import { sortProjectCompiledFiles, sortProjectPathList } from './sort';
import type { ModuleInfo } from './sort';
// import { filterCssFiles } from './filter';
import { flatDirectoryToMap } from '../util/project';
import { parseJsToAst } from '../ast/js';

export const compileReactProject = (
  dir: CodeDirectory,
  opts: {
    entryPath: string;
  }
): CodeCompiledFiles => {
  const compiledList: CodeCompiledFiles = [];
  const modInfos: ModuleInfo[] = [];
  const allFileMap = flatDirectoryToMap(dir);
  const allFilePaths: string[] = Object.keys(allFileMap);

  const _compileFile = (file: CodeFile | CodeFolder) => {
    if (file.type === 'file') {
      let compiledContent: string | null = null;
      if (['react', 'javascript', 'typescript'].includes(file.codeType)) {
        try {
          const reactResult = compileReactFile(file.content, {
            filename: file.name
          });
          const jsAst = parseJsToAst(reactResult.code);
          const amdResult = compileAstToAMD(jsAst.ast, {
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
  const needPathList = sortProjectPathList(opts.entryPath, modInfos);
  const result = sortProjectCompiledFiles(compiledList, needPathList);
  return result;
};
