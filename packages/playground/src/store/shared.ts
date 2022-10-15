import type { SharedStore } from '../types';

export function createSharedStore(): SharedStore {
  return {
    docMode: 'markdown'
  };
}
