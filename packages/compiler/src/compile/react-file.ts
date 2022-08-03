import type { CompileOptions, CompileResult } from '../types';
import { transform } from '../util/babel-standalone/babel';

export const compileReactFile = (
  source: string,
  opts: CompileOptions
): CompileResult => {
  const result = transform(source, {
    filename: '_temp_.tsx',
    babelrc: false,
    presets: [
      'react',
      [
        'typescript',
        {
          allExtensions: true,
          isTSX: true
        }
      ]
    ]
  });
  return {
    code: result?.code || '',
    ast: result?.ast || []
  };
};
