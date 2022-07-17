import { parseJsToAst, generateAstToJs } from "../ast/js";
import type { CompileOptions, CompileResult } from "../types";
import { parseToAMDModule } from "../ast/amd";
import { joinPath } from '../util/path';

function resolveImportPath(ast: any, opts: { baseFolderPath: string }): any {
  ast.forEach((item: any) => {
    if (item?.type === 'ImportDeclaration' && item?.source?.value && opts.baseFolderPath) {
      if (item.source.value.startsWith('./') || item.source.value.startsWith('../') || item.source.value.startsWith('/')) {
        item.source.value = joinPath(opts.baseFolderPath,  item.source.value);
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

export function compileCodeToAMD(
  code: string,
  opts?: CompileOptions & {
    baseFolderPath?: string,
    resolveImportPath?: boolean
  },
): CompileResult {
  const target = parseJsToAst(code);
  const needId = needDefineId(target.ast)
  let targetAst = target.ast;
  if (opts?.resolveImportPath === true && typeof opts?.baseFolderPath === 'string') {
    targetAst = resolveImportPath(targetAst, {
      baseFolderPath: opts.baseFolderPath
    })
  }

  const amdAst: any = parseToAMDModule(needId ? opts?.id : null, targetAst);
  const resultCode: string = generateAstToJs([amdAst]);
  return {
    code: resultCode,
    ast: amdAst,
  };
}
