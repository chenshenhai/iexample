import type { SharedStore, SharedCodeStore } from '../types';

export function createSharedStore(): SharedStore {
  return {
    docMode: 'markdown'
  };
}

export function createSharedCodeStore(): SharedCodeStore {
  return {
    projectType: 'typescript',
    codeDirectory: [],
    currentCodeFilePath: null,
    codeContent: null,
    codeType: 'text'
  };
}
