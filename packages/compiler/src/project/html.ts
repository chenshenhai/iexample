import type {
  CodeDirectory,
  CodeCompiledFile,
  CodeCompiledAdditionalFile
} from '@iexample/types';
import { compileReactProject } from '../compile/react-project';
import { findFileContent } from '../util/project';
import { joinPath, getFolderPath } from '../util/path';
import defineScriptText from '@iexample/define/dist/index.umd.js?raw';

export function compileRuntimeHTML(
  dir: CodeDirectory,
  pagePath: string
): string | null {
  const content = findFileContent(dir, pagePath);
  if (typeof content !== 'string') return content;

  const _convertFullPath = (src: string) => {
    if (
      typeof src === 'string' &&
      !src.startsWith('//') &&
      (src.startsWith('./') || src.startsWith('../') || src.startsWith('/'))
    ) {
      const entry = joinPath(folderPath, src);
      return entry;
    }
  };

  const entryList: string[] = [];
  const folderPath = getFolderPath(pagePath);
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(content, 'text/html');
  const head: HTMLHeadElement =
    doc.querySelector('head') ||
    doc.querySelector('body') ||
    (doc.querySelector('html') as HTMLHeadElement);

  const scripts: NodeListOf<HTMLScriptElement> = doc.querySelectorAll(
    'script[type="module"]'
  );
  scripts.forEach((script: HTMLScriptElement) => {
    const src = script.getAttribute('src');
    if (src) {
      const entry = _convertFullPath(src);
      if (entry) {
        entryList.push(entry);
        script.setAttribute('data-amd-module-path', entry);
      }
    }
  });

  const compiledFiles = compileReactProject(dir, {
    entryList
  });
  const compiledFilePathList = compiledFiles.map((file) => file.path);

  compiledFiles.forEach((compiledFile: CodeCompiledFile) => {
    if (Array.isArray(compiledFile?.additionalFiles)) {
      compiledFile.additionalFiles.forEach(
        (file: CodeCompiledAdditionalFile) => {
          if (
            file.codeType === 'css' &&
            typeof file.compiledContent === 'string'
          ) {
            const style = document.createElement('style');
            style.setAttribute('data-amd-module-path', file.path);
            style.innerHTML = file.compiledContent;
            head.appendChild(style);
          }
        }
      );
    }
  });

  let prevAmdIndex = -1;
  if (scripts[0]) {
    const defineScript = document.createElement('script');
    defineScript.innerHTML = defineScriptText || '';
    scripts[0].before(defineScript);
  }

  scripts.forEach((script: HTMLScriptElement) => {
    const amdPath: string = script.getAttribute('data-amd-module-path') || '';
    const scriptAmdIndex = compiledFilePathList.indexOf(amdPath);
    if (scriptAmdIndex >= 0) {
      for (let i = prevAmdIndex + 1; i <= scriptAmdIndex; i++) {
        const amdModuleScript = document.createElement('script');
        amdModuleScript.setAttribute('data-amd-module-path', amdPath);
        amdModuleScript.innerHTML = compiledFiles[i]?.compiledContent || '';
        script.after(amdModuleScript);
      }
      script.remove();
    }
  });

  const previewContent = doc.querySelector('html')?.innerHTML || '';
  return previewContent;
}
