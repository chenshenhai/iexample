import { parseJsToAst, generateAstToJs } from "../ast/js";
import type { CompileOptions, CompileResult } from "../types";
import { parseToAMDModule } from "../ast/amd";

export function compileCodeToAMD(
  code: string,
  opts?: CompileOptions
): CompileResult {
  const target = parseJsToAst(code);
  // console.log('ast ====', target)
  const amdAst: any = parseToAMDModule(opts?.id, target.ast);

  // console.log('amdAst ===', amdAst)

  const resultCode: string = generateAstToJs([amdAst]);
  
  return {
    code: resultCode,
    ast: amdAst,
  };
}
