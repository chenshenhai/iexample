import { createReturn, createString, createConstProp } from "./estree";

const generateTempNameCreator = () => {
  let index: number = -1;
  return (name?: string) => {
    index++;
    return [
      '_', 
      typeof name === 'string' ? name : '', 
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
  
  moduleAst.forEach((item: any) => {
    if (item?.type === "ImportDeclaration") {
      depIds.push(item?.source?.value);
      if (item?.specifiers?.length === 1 && item?.specifiers[0]?.type === 'ImportDefaultSpecifier') {
         //  import a from 'a';
        depNames.push(item?.specifiers[0]?.local?.name);
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
            // depNames.push(spec?.local?.name);
          } else if  (spec.type === 'ImportSpecifier') {
            // import { a, b as _b } from 'a';
            declareConstPropsAst.push(createConstProp(
              spec.local.name,
              tempName,
              spec.imported.name
            ));
          }
        });
      }

    } else if (item?.type === "ExportDefaultDeclaration") {
      bodyAst.push(createReturn(item?.declaration?.name));
    } else {
      bodyAst.push(item);
    }
  });

  const args = [];
  if (name) {
    args.push(createString(name));
  }
  if (Array.isArray(depIds)) {
    args.push({
      type: "ArrayExpression",
      elements: depIds.map((id: string) => {
        return createString(id);
      }),
    });
  }
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: "define",
      },
      arguments: [
        ...args,
        {
          type: "FunctionExpression",
          id: null,
          generator: false,
          async: false,
          params: depNames.map((name) => {
            return {
              type: "Identifier",
              name: name,
            };
          }),
          body: {
            type: "BlockStatement",
            body: [...declareConstPropsAst, ...bodyAst],
            directives: [],
          },
        },
      ],
    },
  };
};
