import type {
  CodeProjectType,
  CodeProjectCompiler,
  CodeDirectory,
  CodeCompiledFiles
} from '@iexample/types';
import { compileVueSetupProject } from '../compile/vue-setup-project';
import { updateFileContent } from '../util/project';
import { compileRuntimeHTML } from './html';

export class VueSetupProjectCompiler implements CodeProjectCompiler<'vue'> {
  private _entryList: string[] = [];
  private _dir: CodeDirectory = [];
  private _compiledFiles: CodeCompiledFiles = [];

  getType() {
    const type: CodeProjectType = 'vue';
    return type;
  }

  setEntryList(entryList: string[]) {
    this._entryList = entryList;
  }

  setFiles(dir: CodeDirectory): void {
    this._dir = dir;
  }

  compile(): CodeCompiledFiles {
    this._compiledFiles = compileVueSetupProject(this._dir, {
      entryList: this._entryList
    });
    return this._compiledFiles;
  }

  compileFormPage(pagePath: string): string | null {
    const html = compileRuntimeHTML(this._dir, pagePath, 'VUE_SETUP_PROJECT');
    return html;
  }

  updateFileContent(path: string, content: string): CodeCompiledFiles {
    updateFileContent(this._dir, path, content);
    return this.compile();
  }
}
