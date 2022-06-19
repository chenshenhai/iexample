import { reactive } from 'vue';
import { CodeDirectory, CodeFile } from '../types';

export interface StoreCode {
  codeDirectory: CodeDirectory,
  currentCodeFilePath: string | null,
  currentCodeFile: CodeFile | null,
  entryCodeFilePath: string | null,
}

export const storeCode= reactive<StoreCode>({
  codeDirectory: [],
  currentCodeFilePath: null,
  currentCodeFile: null,
  entryCodeFilePath: null,
})