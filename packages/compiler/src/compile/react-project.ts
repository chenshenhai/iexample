import type {
  CodeCompiledFiles, CodeCompiledFile, CodeDirectory, CodeFile, CodeFolder,
} from '@iexample/types';
import { compileReactFile, } from './react-file';
import { compileCodeToAMD } from './amd';
// import { transform } from '../util/babel-standalone/babel';
import { getFolderPath } from '../util/path'

export const compileReactProject = (dir: CodeDirectory): CodeCompiledFiles => {
  const compiledList: CodeCompiledFiles = [];

  const _compileFile = (file: CodeFile | CodeFolder, opts: { pathList: string[] }) => {
    const { pathList } = opts;
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
          });
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
        _compileFile(item, {
          pathList: [...pathList, file.path]
        })
      })
    }
  }
  dir.forEach((item: CodeFile | CodeFolder) => {
    _compileFile(item, { pathList: ['@'] });
  })  
  return compiledList;
}