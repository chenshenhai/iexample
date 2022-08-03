import { parseJsToAst, generateAstToJs } from '../ast/js';
import type { CompileOptions, CompileResult } from '../types';
import { parseToAMDModule } from '../ast/amd';
import { joinPath } from '../util/path';

function resolveImportPath(ast: any, opts: { baseFolderPath: string }): any {
  ast.forEach((item: any) => {
    if (
      item?.type === 'ImportDeclaration' &&
      item?.source?.value &&
      opts.baseFolderPath
    ) {
      if (
        item.source.value.startsWith('./') ||
        item.source.value.startsWith('../') ||
        item.source.value.startsWith('/')
      ) {
        item.source.value = joinPath(opts.baseFolderPath, item.source.value);
      }
    }
  });
  return ast;
}

function needDefineId(ast: any) {
  for (let i = 0; i < ast?.length; i++) {
    const item = ast[i];
    if (item?.type === 'ExportDefaultDeclaration') {
      return true;
    } else if (item?.type === 'ExportNamedDeclaration') {
      return true;
    }
  }
  return false;
}

export function compileAstToAMD(
  ast: any[],
  opts?: CompileOptions & {
    baseFolderPath?: string;
    resolveImportPath?: boolean;
    allFilePaths?: string[];
  }
): CompileResult {
  const needId = needDefineId(ast);
  let targetAst = ast;
  if (
    opts?.resolveImportPath === true &&
    typeof opts?.baseFolderPath === 'string'
  ) {
    targetAst = resolveImportPath(targetAst, {
      baseFolderPath: opts.baseFolderPath
    });
  }

  let allFilePaths: string[] = [];
  if (Array.isArray(opts?.allFilePaths) && opts?.allFilePaths) {
    allFilePaths = opts?.allFilePaths;
  }

  const amdAst: any = parseToAMDModule(
    needId ? opts?.id : null,
    targetAst,
    allFilePaths
  );
  const resultCode: string = generateAstToJs([amdAst]);
  return {
    code: resultCode,
    ast: amdAst
  };
}

export function compileCodeToAMD(
  code: string,
  opts?: CompileOptions & {
    baseFolderPath?: string;
    resolveImportPath?: boolean;
    allFilePaths?: string[];
  }
): CompileResult {
  const target = parseJsToAst(code);
  return compileAstToAMD(target.ast, opts);
}
