import type {
  CodeProjectType,
  CodeProjectCompiler,
  CodeDirectory,
  CodeCompiledFiles
} from '@iexample/types';
import { compileReactProject } from '../compile/react-project';
import { updateFileContent } from '../util/project';

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

  updateFileContent(path: string, content: string): CodeCompiledFiles {
    updateFileContent(this._dir, path, content);
    return this.compile();
  }
}
