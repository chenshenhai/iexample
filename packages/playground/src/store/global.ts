import { reactive } from 'vue';


export interface StoreGlobal {
  theme: 'light' | 'dark',
  // codeDirectory: CodeDirectory,
  // currentCodeFile: CodeFile | null,
  // entryCodeFilePath: string | null,
}

export const storeGlobal = reactive<StoreGlobal>({
  theme: 'light',
  // codeDirectory: [],
  // currentCodeFile: null,
  // entryCodeFilePath: null,
})