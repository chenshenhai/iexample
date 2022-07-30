import type { CodeProjectType, CodeProjectCompiler, CodeDirectory, CodeCompiledFiles } from '@iexample/types';
import { compileVueSetupProject } from '../compile/vue-setup-project';
import { updateFileContent } from '../util/project';

export class VueSetupProjectCompiler implements CodeProjectCompiler<'vue'> {

  private _entryPath: string = '';
  private _dir: CodeDirectory = [];
  private _compiledFiles: CodeCompiledFiles = [];

  getType() {
    const type: CodeProjectType = 'vue'
    return type;
  }

  setEntryPath(entryPath: string) {
    this._entryPath = entryPath;
  }

  setFiles(dir: CodeDirectory): void {
    this._dir = dir;
  }

  compile(): CodeCompiledFiles {
    this._compiledFiles = compileVueSetupProject(this._dir, {
      entryPath: this._entryPath
    });
    return this._compiledFiles;
  }

  updateFileContent(path: string, content: string): CodeCompiledFiles {
    updateFileContent(this._dir, path, content);
    return this.compile();
  }

}