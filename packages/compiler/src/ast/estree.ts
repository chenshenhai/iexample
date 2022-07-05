export const getConst = (name: string, value: any) => {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: name,
        },
        init: value,
      },
    ],
    kind: 'const',
  };
};

export const getConstProp = (name: string, objectName: string, propName: string) => {
  return {
    'type': 'VariableDeclaration',
    'declarations': [
      {
        'type': 'VariableDeclarator',
        'id': {
          'type': 'Identifier',
          'name': name
        },
        'init': {
          'type': 'MemberExpression',
          'object': {
            'type': 'Identifier',
            'name': objectName
          },
          'computed': false,
          'property': {
            'type': 'Identifier',
            'name': propName
          }
        }
      }
    ],
    'kind': 'const'
  }
}

export const getObjectFunc = (name: string, params: any[], body: any) => {
  return {
    'type': 'ObjectMethod',
    'method': true,
    'key': {
      'type': 'Identifier',
      'name': name
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': params,
    'body': {
      'type': 'BlockStatement',
      'body': body,
      'directives': []
    }
  }
};

export const getObjectPreporty = (name: string, valueName: string) => {
  return {
    type: 'ObjectProperty',
    method: false,
    key: {
      type: 'Identifier',
      name: name,
    },
    computed: false,
    shorthand: false,
    value: {
      type: 'Identifier',
      name: valueName,
    },
  };
};

export const getReturn = (name: string) => {
  return {
    type: 'ReturnStatement',
    argument: {
      type: 'Identifier',
      name: name,
    },
  };
};


export const getDefaultExport = (name: string) => {
  return {
    'type': 'ExportDefaultDeclaration',
    'declaration': {
      'type': 'Identifier',
      'name': name
    }
  }
}

export const getString = (value: string) => {
  return {
    type: 'StringLiteral',
    value,
  }
}

export const getEmptyObject = (name: string) => {
  return {
    'type': 'VariableDeclaration',
    'declarations': [
      {
        'type': 'VariableDeclarator',
        'id': {
          'type': 'Identifier',
          'name': name
        },
        'init': {
          'type': 'ObjectExpression',
          'properties': []
        }
      }
    ],
    'kind': 'const'
  }
}

export const getIdentifier = (name: string) => {
  return {
    'type': 'Identifier',
    'name': name
  }
}

export const getObjectPropertyExpression = (objName: string, propertyName: string, value: any) => {
  return {
    'type': 'ExpressionStatement',
    'expression': {
      'type': 'AssignmentExpression',
      'operator': '=',
      'left': {
        'type': 'MemberExpression',
        'object': {
          'type': 'Identifier',
          'name': objName
        },
        'computed': false,
        'property': {
          'type': 'Identifier',
          'name': propertyName
        }
      },
      'right': value,
    }
  }
}