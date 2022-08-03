import {
  parse,
  compileTemplate,
  compileScript,
  compileStyle
} from '@vue/compiler-sfc';
import { extractCode, parseScriptElementAttrs } from '../util/extract';
import { parseJsToAst, generateAstToJs } from '../ast/js';
import { getConst, getObjectFunc, getDefaultExport } from './../ast/estree';
import { transform } from '../util/babel-standalone/babel';
import type {
  CompileOptions,
  CompileResult,
  CompileVueScriptOptions
} from '../types';

const MODULE_DECLARE_NAME = '__vue_mod__';
const DEFAULT_SCOPED = false;

function compileJs(
  source: string,
  opts: Required<CompileVueScriptOptions>
): CompileResult {
  let scriptElement: string =
    extractCode(source, { type: 'script', withElement: true }) || '';
  const scriptContent: string = extractCode(source, { type: 'script' }) || '';
  const attrs = parseScriptElementAttrs(scriptElement || '');
  if (attrs.lang === 'ts') {
    const _scriptContent =
      transform(scriptContent, {
        filename: '_temp_.vue',
        babelrc: false,
        presets: [
          [
            'typescript',
            {
              allExtensions: true,
              isTSX: true
            }
          ]
        ]
      })?.code || '';
    delete attrs['lang'];
    const attrStr = Object.keys(attrs)
      .map((name) => {
        if (attrs[name]) {
          return `${name}=${attrs[name]}`;
        }
        return name;
      })
      .join(' ');
    scriptElement = `<script ${attrStr}>\n${_scriptContent}\n</script>`;
  }

  const { descriptor } = parse(scriptElement);
  const jsCode = compileScript(descriptor, opts);

  const result = parseJsToAst(jsCode.content || '');

  return {
    code: result.code,
    ast: result.ast
  };
}

function compileTpl(
  source: string,
  opts: Required<CompileOptions>
): CompileResult {
  const mainTpl = extractCode(source, { type: 'template' }) || '';
  console.log('opts ====', opts);
  const tplCode = compileTemplate({
    id: opts.id,
    source: mainTpl,
    scoped: DEFAULT_SCOPED,
    filename: opts.filename
  });
  const result = parseJsToAst(tplCode.code || '');
  return {
    code: result.code,
    ast: result.ast
  };
}

function compileCss(
  source: string,
  opts: Required<CompileOptions>
): CompileResult {
  const style = extractCode(source, { type: 'style' }) || '';
  const styleCode = compileStyle({
    source: style,
    scoped: DEFAULT_SCOPED,
    id: opts.id,
    filename: opts.filename
  });
  return {
    code: styleCode.code,
    ast: null
  };
}

function wrapSetupModule(moduleAst: any, renderAst: any) {
  if (
    moduleAst.type === 'ObjectExpression' &&
    Array.isArray(moduleAst.properties)
  ) {
    // Resolve custom components
    renderAst.body.body.forEach((item: any) => {
      if (
        item?.type === 'VariableDeclaration' &&
        item?.declarations?.length === 1 &&
        item?.declarations?.[0]?.init?.callee?.name === '_resolveComponent' &&
        item?.declarations?.[0]?.init?.arguments?.[0]?.type === 'StringLiteral'
      ) {
        item.declarations[0].init = {
          type: 'Identifier',
          name: item?.declarations?.[0]?.init?.arguments?.[0].value
        };
      }
    });

    moduleAst.properties.push(
      getObjectFunc('render', renderAst.params, renderAst.body.body)
    );
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
      tplAst.push(item);
    }
  });

  jsResult?.ast?.forEach((item: any) => {
    if (item.type === 'ImportDeclaration') {
      importAst.push(item);
    } else if (item.type === 'ExportDefaultDeclaration' && item.declaration) {
      moduleAst = item.declaration;
    }
  });

  moduleAst = wrapSetupModule(moduleAst, renderAst);
  ast = [
    ...importAst,
    ...tplAst,
    ...[getConst(MODULE_DECLARE_NAME, moduleAst)],
    ...[getDefaultExport(MODULE_DECLARE_NAME)]
  ];
  const code = generateAstToJs(ast);
  return {
    code,
    ast
  };
}

export const compileVueSetupFile = (
  source: string,
  opts: { filename: string }
) => {
  const scopedId = `data-v-${Math.random().toString(16).substring(2)}`;
  const js = compileJs(source, {
    id: scopedId,
    filename: opts.filename,
    ts: false
  });
  const tpl = compileTpl(source, { id: scopedId, filename: opts.filename });
  const css = compileCss(source, { id: scopedId, filename: opts.filename });
  const result = mergeJs(js, tpl);
  return {
    js: result.code,
    css: css.code
  };
};
