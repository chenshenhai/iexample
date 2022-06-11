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