import { createConst, createFunc } from './../ast/estree';
import {
  parse,
  compileTemplate,
  compileScript,
  compileStyle,
} from '@vue/compiler-sfc';
import { extractCode } from '../util/extract';
import { parseJsToAst, generateAstToJs } from '../ast/js';
import { SINGLE_MODULE_DECLARE_NAME } from '../config/name';

interface CompileOptions { 
  id: string,
  filename: string
}

interface CompileResult {
  code: string,
  ast: any[] | any | null,
}

function compileJs(source: string, opts: CompileOptions): CompileResult {
  const { descriptor } = parse(source)
  const jsCode = compileScript(
    descriptor,
    opts
  );
  const result = parseJsToAst(jsCode.content);
  return {
    code: result.code,
    ast: result.ast,
  };
}

function compileTpl(source: string, opts: CompileOptions): CompileResult {
  const mainTpl = extractCode(source, { type: 'template' }) || '';
  const tplCode = compileTemplate({
    id: opts.id,
    source: mainTpl,
    scoped: true,
    filename: opts.filename,
  });
  const result = parseJsToAst(tplCode.code || '');
  return {
    code: result.code,
    ast: result.ast,
  };
}

function compileCss(source: string, opts: CompileOptions): CompileResult {
  const style = extractCode(source, { type: 'style' }) || '';
  const styleCode = compileStyle({
    source: style,
    scoped: true,
    id: opts.id,
    filename: opts.filename,
  });
  return {
    code: styleCode.code,
    ast: null
  };
}


function wrapSetupModule(moduleAst: any, renderAst: any) {
  if (moduleAst.type === 'ObjectExpression' && Array.isArray(moduleAst.properties)) {
    moduleAst.properties.push(createFunc('render', renderAst.params, renderAst.body.body))
  }
  return moduleAst;
}

function mergeJs(jsResult: CompileResult, tplResult: CompileResult) {
  let ast: any[] = [];
  const importAst: any[] = [];
  let moduleAst: any = null;
  const tplAst: any[] = [];
  let renderAst: any = null;
  tplResult?.ast?.forEach((item: any) => {
    if (item.type === 'ImportDeclaration') {
      importAst.push(item);
    } else if (item.type === 'ExportNamedDeclaration' && item.declaration) {
      renderAst = item.declaration;
    } else {
      tplAst.push(item)
    }
  })

  jsResult?.ast?.forEach((item: any) => {
    if (item.type === 'ImportDeclaration') {
      importAst.push(item);
    } else if (item.type === 'ExportDefaultDeclaration' && item.declaration) {
      moduleAst = item.declaration;
    }
  })
  

  moduleAst = wrapSetupModule(moduleAst, renderAst)
  ast = [
    ...importAst,
    ...tplAst,
    ...[
      createConst(SINGLE_MODULE_DECLARE_NAME, moduleAst)
    ]
  ]
  const code = generateAstToJs(ast);
  return {
    code,
    ast,
  }
}

export const compileVueSetupFile = (source: string, opts: { filename: string }) => {

  const scopedId = `data-v-${Math.random().toString(16).substring(2)}`;
  const js = compileJs(source, { id: scopedId, filename: opts.filename })
  const tpl = compileTpl(source, { id: scopedId, filename: opts.filename })
  const css = compileCss(source, { id: scopedId, filename: opts.filename })

  console.log('js ==', js);
  console.log('tpl ====', tpl)
  console.log('css ====', css)

  const result = mergeJs(js, tpl);
  
  // console.log('merge ===', result);
  return {
    js: result.code,
    css: css.code
  }
}



