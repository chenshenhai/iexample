
import { createReturn } from './estree';

export const parseToAMDModule = (name: string, moduleAst: any[]) => {
  const depIds: string[] = [];
  const depNames: string[] = [];
  const bodyAst: any[] = [];

  moduleAst.forEach((item: any) => {
    if (item?.type === 'ImportDeclaration') {
      depIds.push(item?.source?.value);
      depNames.push(item?.specifiers[0]?.local?.name)
    } else if (item?.type === 'ExportDefaultDeclaration') {
      bodyAst.push(createReturn(item?.declaration?.name))
    } else {
      bodyAst.push(item)
    }
  })

  const args = [];
  if (name) {
    args.push({
      "type": "Literal", // "StringLiteral",
      "value": name
    })
  }
  if (Array.isArray(depIds)) {
    args.push({
      "type": "ArrayExpression",
      "elements": depIds.map((id: string) => {
        return {
          "type": "Literal", // "StringLiteral",
          "value": id
        };
      }),
    },)
    
  }
  return {
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "define"
      },
      "arguments": [
        ...args,
        {
          "type": "FunctionExpression",
          "id": null,
          "generator": false,
          "async": false,
          "params": depNames.map((name) => {
            return   {
              "type": "Identifier",
              "name": name
            };
          }),
          "body": {
            "type": "BlockStatement",
            "body": [
              ...bodyAst
            ],
            "directives": []
          }
        }
      ]
    }
  }
}