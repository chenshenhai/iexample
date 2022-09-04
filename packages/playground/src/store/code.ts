import { reactive } from 'vue';
import type { CodeDirectory, CodeType } from '../types';

export interface StoreCode {
  codeDirectory: CodeDirectory;
  currentCodeFilePath: string | null;
  codeContent: string | null;
  codeType: CodeType;
}

export const storeCode = reactive<StoreCode>({
  codeDirectory: [],
  currentCodeFilePath: null,
  codeContent: null,
  codeType: 'text'
});
