export const createConst = (name: string, value: any) => {
  return {
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: name,
        },
        init: value,
      },
    ],
    kind: "const",
  };
};

export const createObjectFunc = (name: string, params: any[], body: any) => {
  return {
    "type": "ObjectMethod",
    "method": true,
    "key": {
      "type": "Identifier",
      "name": name
    },
    "computed": false,
    "kind": "method",
    "id": null,
    "generator": false,
    "async": false,
    "params": params,
    "body": {
      "type": "BlockStatement",
      "body": body,
      "directives": []
    }
  }
};

export const createObjectPreporty = (name: string, valueName: string) => {
  return {
    type: "ObjectProperty",
    method: false,
    key: {
      type: "Identifier",
      name: name,
    },
    computed: false,
    shorthand: false,
    value: {
      type: "Identifier",
      name: valueName,
    },
  };
};

export const createReturn = (name: string) => {
  return {
    type: "ReturnStatement",
    argument: {
      type: "Identifier",
      name: name,
    },
  };
};


export const createDefaultExport = (name: string) => {
  return {
    "type": "ExportDefaultDeclaration",
    "declaration": {
      "type": "Identifier",
      "name": name
    }
  }
}

export const createString = (value: string) => {
  return {
    type: "StringLiteral",
    value,
  }
}