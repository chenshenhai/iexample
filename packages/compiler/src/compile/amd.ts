import { parseJsToAst, generateAstToJs } from '../ast/js';
import { CompileOptions, CompileResult } from '../types';
import { parseToAMDModule } from '../ast/amd';

export function compileCodeToAMD(code: string, opts?: CompileOptions): CompileResult {
  const target = parseJsToAst(code);
  // console.log('ast ====', target)
  const amdAst = parseToAMDModule(opts?.id, target.ast)

  // console.log('amdAst ===', amdAst)

  const resultCode = generateAstToJs([amdAst]);
// console.log('amdCode ===', `
// ${resultCode}  
// `)
  
  return {
    code: resultCode,
    ast: amdAst,
  };
}

