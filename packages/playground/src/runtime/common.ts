import { toRaw } from 'vue';
import { formatPath } from '../util/format';
import injectScript from './assets/inject-script.js?raw';
import type { CodeDirectory } from '../types';

function getEntryContent(
  entryPath: string,
  directory: CodeDirectory
): string | null {
  for (let i = 0; i < directory.length; i++) {
    const file = directory[i];
    if (file.type === 'file' && entryPath === file.path) {
      return file.content;
    }
  }
  return null;
}

export function runtime(
  entryPath: string,
  directory: CodeDirectory
): string | null {
  const main = getEntryContent(formatPath(entryPath), toRaw(directory));
  let result: string | null = main;
  if (main) {
    const dom = new DOMParser().parseFromString(main, 'text/html');
    const head = dom.querySelector('head');
    const body = dom.querySelector('body');
    const scripts = dom.querySelectorAll('script');
    const links = dom.querySelectorAll('link');
    const inject = document.createElement('script');
    inject.innerHTML = injectScript;
    if (scripts.length > 0) {
      scripts[0].before(inject);
    } else if (head) {
      head.appendChild(inject);
    } else if (body) {
      body.appendChild(inject);
    }

    scripts.forEach(script => {
      const src = script.getAttribute('src') || '';
      const path = formatPath(src);
      for (let i = 0; i < directory.length; i++) {
        const file = directory[i];
        if (file?.type === 'file' && formatPath(file.path) === path) {
          script.removeAttribute('src');
          script.setAttribute('type', 'module');
          script.innerHTML = file.content;
          break;
        }
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const path = formatPath(href);
      for (let i = 0; i < directory.length; i++) {
        const file = directory[i];
        if (file?.type === 'file' && formatPath(file.path) === path) {
          const style = document.createElement('style');
          style.innerHTML = file.content;
          link.after(style);
          link.remove();
          break;
        }
      }
    });
    result = dom?.querySelector('html')?.innerHTML || null;
  }
  return result;
}
