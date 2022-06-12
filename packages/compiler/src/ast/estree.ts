export const createConst = (name: string, value: any) => {
  return {
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": name
        },
        "init": value
      }
    ],
    "kind": "const"
  }
}

export const createFunc = (name: string, params: any[], body: any) => {
  console.log('body ===', body)
  return {
    "type": "Property",
    "method": true,
    "shorthand": false,
    "computed": false,
    "key": {
      "type": "Identifier",
      "name": name
    },
    "kind": "init",
    "value": {
      "type": "FunctionExpression",
      "id": null,
      "expression": false,
      "generator": false,
      "params": params,
      "body": {
        "type": "BlockStatement",
        "body": body
      }
    }
  }
}