import type {
  CodeProjectType,
  CodeProjectCompiler,
  CodeDirectory,
  CodeCompiledFiles
} from '@iexample/types';
import { compileReactProject } from '../compile/react-project';
import { updateFileContent } from '../util/project';

export class ReactProjectCompiler implements CodeProjectCompiler<'react'> {
  private _entryPath = '';
  private _dir: CodeDirectory = [];
  private _compiledFiles: CodeCompiledFiles = [];

  getType() {
    const type: CodeProjectType = 'react';
    return type;
  }

  setEntryPath(entryPath: string) {
    this._entryPath = entryPath;
  }

  setFiles(dir: CodeDirectory): void {
    this._dir = dir;
  }

  compile(): CodeCompiledFiles {
    this._compiledFiles = compileReactProject(this._dir, {
      entryPath: this._entryPath
    });
    return this._compiledFiles;
  }

  updateFileContent(path: string, content: string): CodeCompiledFiles {
    updateFileContent(this._dir, path, content);
    return this.compile();
  }
}
