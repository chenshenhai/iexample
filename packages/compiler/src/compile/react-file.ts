import type { CompileOptions, CompileResult } from '../types';
// import { transform } from '../util/babel-standalone';
import { transform } from '@babel/standalone';

export const compileReactFile = (source: string, opts: CompileOptions): CompileResult => {
  
  // console.log('source ====', source)
  const result = transform(source, {
    presets: [
      'react'
    ]
  })
  return {
    code: '',
    ast: []
  }
}