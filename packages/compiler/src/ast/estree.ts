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

export const createObjectFunc = (name: string, params: any[], body: any) => {
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

export const createObjectPreporty = (name: string, valueName: string) => {
  return {
    "type": "ObjectProperty",
    "method": false,
    "key": {
      "type": "Identifier",
      "name": name
    },
    "computed": false,
    "shorthand": false,
    "value": {
      "type": "Identifier",
      "name": valueName
    }
  }
}