import type { CompileOptions, CompileResult } from '../types';
import { transform } from '../util/babel-standalone/babel';

export const compileReactFile = (source: string, opts: CompileOptions): CompileResult => {
  
  // console.log('source ====', source)
  const result = transform(source, {
    presets: [
      'react'
    ]
  })
  return {
    code: result?.code || '',
    ast: result?.ast || []
  }
}