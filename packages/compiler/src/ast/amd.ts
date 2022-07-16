import { getReturn, getString, getConstProp, getEmptyObject, getIdentifier, getObjectPropertyExpression } from './estree';
import { SINGLE_MODULE_DECLARE_NAME } from '../config/name';

const generateTempNameCreator = () => {
  let index: number = -1;
  return (name?: string) => {
    index++;
    return [
      '_', 
      typeof name === 'string' ? name.match(/[a-z0-9]{1,}/ig)?.join('_') : '', 
      index
    ].join('_')
  }
}

const createTempName = generateTempNameCreator();

export const parseToAMDModule = (
  name: string | undefined,
  moduleAst: any[]
) => {
  const depIds: string[] = [];
  const depNames: string[] = [];
  const declareConstPropsAst: any[] = [];
  const bodyAst: any[] = [];
  const declareExportAst: any[] = [];
  
  moduleAst.forEach((item: any) => {
    if (item?.type === 'ImportDeclaration') {
      depIds.push(item?.source?.value);
      if (item?.specifiers?.length === 1 && item?.specifiers[0]?.type === 'ImportDefaultSpecifier') {
        // import a from 'a';
        const tempName = createTempName(item?.specifiers[0]?.local?.name);
        depNames.push(tempName);
        declareConstPropsAst.push(getConstProp(
          item?.specifiers[0]?.local?.name,
          tempName,
          'default',
        ));
      } else if (item?.specifiers?.length >= 1) {
        let tempName = createTempName(item?.source?.value);
        for (let i = 0; i < item?.specifiers.length; i++) {
          if (item?.specifiers[i].type === 'ImportDefaultSpecifier') {
            tempName = item?.specifiers[i]?.local?.name
            break;
          }
        }
        depNames.push(tempName);

        item?.specifiers.forEach((spec: any) => {
          if (spec.type === 'ImportDefaultSpecifier') {
            // import a, { ... } from 'a';
            // nothing
          } else if  (spec.type === 'ImportSpecifier') {
            // import { a, b as _b } from 'a';
            declareConstPropsAst.push(getConstProp(
              spec.local.name,
              tempName,
              spec.imported.name
            ));
          } else if (spec.type === 'ImportNamespaceSpecifier') {
            // parse: import * as X from "xxx"
            // to: define(['xxx'], function(X) {})
            depIds.push(item?.source?.value);
            depNames.push(spec?.local?.name);
          }
        });
      }
    } else if (item?.type === 'ExportDefaultDeclaration') {
      // export default xxx
      const expression = getObjectPropertyExpression(SINGLE_MODULE_DECLARE_NAME, 'default', getIdentifier(item?.declaration?.name))
      declareExportAst.push(expression);
    } else if (item?.type === 'ExportNamedDeclaration') {
      // export xxx
      if (item?.declaration?.type === 'VariableDeclaration') {
        // export const xxx = xxx
        const expression = getObjectPropertyExpression(
          SINGLE_MODULE_DECLARE_NAME,
          item?.declaration?.declarations?.[0]?.id?.name,
          item?.declaration?.declarations?.[0]?.init
        )
        declareExportAst.push(expression);
      } else if (item?.declaration?.type === 'FunctionDeclaration') {
        // export function xxxx() { }
        const expression = getObjectPropertyExpression(
          SINGLE_MODULE_DECLARE_NAME, 
          item?.declaration?.id?.name,
          item?.declaration
        )
        declareExportAst.push(expression);
      }  else if (Array.isArray(item?.declaration?.specifiers)) {
        // export { x, xxx, xxx }
        item.declaration.specifiers.forEach((spec: any) => {
          const expression = getObjectPropertyExpression(
            SINGLE_MODULE_DECLARE_NAME, 
            spec.local.name,
            spec.exported
          )
          declareExportAst.push(expression);
        })
      } 
    } else {
      bodyAst.push(item);
    }
  });

  const args = [];
  if (name) {
    args.push(getString(name));
  }
  if (Array.isArray(depIds)) {
    args.push({
      type: 'ArrayExpression',
      elements: depIds.map((id: string) => {
        return getString(id);
      }),
    });
  }
  if (declareExportAst.length > 0) {
    declareExportAst.unshift(getEmptyObject(SINGLE_MODULE_DECLARE_NAME))
    declareExportAst.push(getReturn(SINGLE_MODULE_DECLARE_NAME))
  }
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'define',
      },
      arguments: [
        ...args,
        {
          type: 'FunctionExpression',
          id: null,
          generator: false,
          async: false,
          params: depNames.map((name) => {
            return {
              type: 'Identifier',
              name: name,
            };
          }),
          body: {
            type: 'BlockStatement',
            body: [...declareConstPropsAst, ...bodyAst, ...declareExportAst],
            directives: [],
          },
        },
      ],
    },
  };
};
