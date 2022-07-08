import { transform, transformFromAst } from '../util/babel-standalone/babel';

// import { getConst } from './estree';

interface CompileResult {
  code: string;
  ast: any[] | any | null;
}

// export function parseJsToAst(code: string): CompileResult {
//   const ast = babelParse(code || '', {
//     sourceType: "module",
//     plugins: [],
//   });

//   // const ast = acornParse(code || "", {
//   //   ecmaVersion: 2015,
//   //   sourceType: "module",
//   // });

//   return {
//     code,
//     ast: ast?.program?.body || [],
//     // @ts-ignore
//     // ast: ast?.body || [],
//   };
// }

export function parseJsToAst(code: string): CompileResult {
  const result = transform(code, {
    ast: true,
    presets: [
      'react'
    ]
  })
  return {
    code,
    ast: result?.ast?.program?.body || []
  };
}


// @ts-ignore
export function generateAstToJs(ast: any[]): string {
  const result = transformFromAst({
    type: "File",
    program: {
      type: "Program",
      body: ast,
      directives: [],
      sourceType: "module",
      sourceFile: '',
    }
  },  '', {
    ast: true,
    code: true,
  })
  // @ts-ignore
  const code = result?.code || '';
  return code;
}
