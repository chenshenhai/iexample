import { parseJsToAst, generateAstToJs } from '../ast/js';
import { CompileOptions, CompileResult } from '../types';
import { parseToAMDModule } from '../ast/amd';

export function compileCodeToAMD(code: string, opts?: CompileOptions): CompileResult {
  const target = parseJsToAst(code);
  console.log('ast ====', target)
  // const depIds: string[] = [];
  // const depNames: string[] = [];
  // const defineBodyAst: any[] = [];

  // target.ast.forEach((item: any) => {
  //   if (item?.type === 'ImportDeclaration') {
  //     // if (typeof item?.source?.value === 'string') {}
  //     depIds.push(item?.source?.value);
  //     depNames.push(item?.specifiers[0]?.local?.name)
  //   } else if (item?.type === 'ExportDefaultDeclaration') {

  //   } else {
  //     defineBodyAst.push(item)
  //   }
  // })


  // const amdAst = createDefineModule('/aaa/bbb/ccc', depIds, depNames, [...defineBodyAst])
  const amdAst = parseToAMDModule('/aaa/bbb/ccc', target.ast)

  console.log('amdAst ===', amdAst)


  const resultCode = generateAstToJs([amdAst]);
  console.log('amdCode ===', `
${resultCode}  
  `)
  
  return {
    code: resultCode,
    ast: amdAst,
  };
}

