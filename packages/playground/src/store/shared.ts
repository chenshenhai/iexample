import type { SharedStore, SharedCodeStore } from '../types';

export function createSharedStore(): SharedStore {
  return {
    docMode: 'markdown'
  };
}

export function createSharedCodeStore(): SharedCodeStore {
  return {
    codeDirectory: [],
    currentCodeFilePath: null,
    codeContent: null,
    codeType: 'text'
  };
}
