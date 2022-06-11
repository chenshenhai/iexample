import {
  parse,
  compileTemplate,
  compileScript,
  compileStyle,
} from '@vue/compiler-sfc';
import { extractCode } from '../util/extract';
import { parse as babelParse } from '@babel/parser';
import { generate } from 'astring'

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
  return {
    code: jsCode.content,
    ast: jsCode.scriptAst || jsCode.scriptSetupAst || null
  };
}

function compileTpl(source: string, opts: CompileOptions): CompileResult {
  const tplCode = compileTemplate({
    id: opts.id,
    source: source,
    scoped: true,
    filename: opts.filename,
  });
  const ast = babelParse(tplCode.code || '', {
    sourceType: "module",
    plugins: [],
  });
  return {
    code: tplCode.code,
    ast: ast?.program?.body || null,
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

function mergeJs(jsResult: CompileResult, tplResult: CompileResult) {
  const ast: any[] = [];
  const importAst: any[] = [];
  jsResult?.ast?.forEach((item: any) => {
    if (item.type === 'ImportDeclaration') {
      importAst.push(item);
    }
  })
  tplResult?.ast?.forEach((item: any) => {
    if (item.type === 'ImportDeclaration') {
      importAst.push(item);
    }
  })
  console.log('importAst ===', importAst)

  // @ts-ignore
  const code = generate({
    "type": "Program",

  // @ts-ignore
    "body": importAst,
  });
  console.log('code ===', code)
}

export const compileVueFileStr = (source: string, opts: { filename: string }) => {

  const scopedId = `data-v-${Math.random().toString(16).substring(2)}`;
  const js = compileJs(source, { id: scopedId, filename: opts.filename })
  const tpl = compileTpl(source, { id: scopedId, filename: opts.filename })
  const css = compileCss(source, { id: scopedId, filename: opts.filename })

  console.log('js ==', js);
  console.log('tpl ====', tpl)
  console.log('css ====', css)

  const code = mergeJs(js, tpl);
  console.log('code ===', code);
}


