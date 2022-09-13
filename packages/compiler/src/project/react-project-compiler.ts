import type {
  CodeProjectType,
  CodeProjectCompiler,
  CodeDirectory,
  CodeCompiledFiles
} from '@iexample/types';
import { compileReactProject } from '../compile/react-project';
import { updateFileContent, findFileContent } from '../util/project';
import { joinPath, getFolderPath } from '../util/path';
import { compileRuntimeHTML } from './html';

export class ReactProjectCompiler implements CodeProjectCompiler<'react'> {
  private _entryList: string[] = [];
  private _dir: CodeDirectory = [];
  private _compiledFiles: CodeCompiledFiles = [];

  getType() {
    const type: CodeProjectType = 'react';
    return type;
  }

  setEntryList(entryList: string[]) {
    this._entryList = entryList;
  }

  setFiles(dir: CodeDirectory): void {
    this._dir = dir;
  }

  compile(): CodeCompiledFiles {
    this._compiledFiles = compileReactProject(this._dir, {
      entryList: this._entryList
    });
    return this._compiledFiles;
  }

  compileFormPage(pagePath: string): string | null {
    const html = compileRuntimeHTML(this._dir, pagePath);
    return html;
  }

  updateFileContent(path: string, content: string): CodeCompiledFiles {
    updateFileContent(this._dir, path, content);
    return this.compile();
  }
}
