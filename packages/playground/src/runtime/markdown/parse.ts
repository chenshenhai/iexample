import { Lexer, marked } from 'marked';
import { parse } from 'yaml';
import type {} from 'marked';
import type { CodeDirectory, CodeFile, CodeType } from '@iexample/types';
import { KEY_TYPE, KEY_FILE } from './config';

const lexer = new Lexer();

function isHtmlAnnotationToken(token: marked.Token): boolean {
  if (token.type === 'html' && /^<!--[\s\S]*?-->$/.test(token?.text?.trim())) {
    return true;
  }
  return false;
}

function getHtmlAnnotationContent(html: string): string {
  const reg = /<!--([\s\S]*?)-->/;
  const execResult = reg.exec(html);
  const content = execResult?.[1] || '';
  return content;
}

function isValidFilePath(path: string): boolean {
  if (path.startsWith('@/') && /\.[a-z]{1,}$/.test(path)) {
    return true;
  }
  return false;
}

type ProjectType = 'react' | 'vue';
const PROJECT_TYPES: ProjectType[] = ['react', 'vue'];

function appendFile(
  projectType: ProjectType,
  dir: CodeDirectory,
  filePath: string,
  content: string
) {
  if (!isValidFilePath(filePath)) {
    return;
  }
  const pathList = filePath.split('/');
  while (pathList.length > 0) {
    // TODO
  }
}

export function parseMarkdownProject(md: string): {
  dir: CodeDirectory;
  codeType: CodeType;
} {
  const project: { dir: CodeDirectory; codeType: CodeType } = {
    codeType: 'javascript',
    dir: []
  };
  const tokens: marked.TokensList = lexer.lex(md);
  let projectType: ProjectType | null = null;
  const fileConfigMap = new Map<number, string>();

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (isHtmlAnnotationToken(tk)) {
      const content = getHtmlAnnotationContent(tk.raw);
      const config = parse(content);
      if (typeof config?.[KEY_TYPE] === 'string' && config?.[KEY_TYPE]) {
        if (
          projectType === null &&
          PROJECT_TYPES.includes(config[KEY_TYPE] as ProjectType)
        ) {
          projectType = config[KEY_TYPE] as ProjectType;
        }
      } else if (typeof config?.[KEY_FILE] === 'string' && config?.[KEY_FILE]) {
        fileConfigMap.set(i, config?.[KEY_FILE]);
      }
    }
  }

  console.log('projectType ====== ', projectType);
  console.log('tokens ====== ', tokens);

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (i <= tokens.length - 1) {
      break;
    }
    const nextTk = tokens[i + 1];
    if (fileConfigMap.has(i) && nextTk.type === 'code') {
    }
  }

  // console.log('tokens ====', tokens);
  return project;
}
