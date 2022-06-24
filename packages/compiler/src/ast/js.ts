// import { parse as babelParse } from '@babel/parser';
import { generate } from "astring";
import { parse as acornParse } from "acorn";

// import { createConst } from './estree';

interface CompileResult {
  code: string;
  ast: any[] | any | null;
}

export function parseJsToAst(code: string): CompileResult {
  // const ast = babelParse(tplCode.code || '', {
  //   sourceType: "module",
  //   plugins: [],
  // });

  const ast = acornParse(code || "", {
    ecmaVersion: 2015,
    sourceType: "module",
  });

  return {
    code,
    // ast: ast?.program?.body || null,
    // @ts-ignore
    ast: ast?.body || [],
  };
}

export function generateAstToJs(ast: any[]): string {
  const code = generate({
    type: "Program",
    // @ts-ignore
    body: ast,
  });
  return code || "";
}
