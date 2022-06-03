import { reactive } from 'vue';


export interface IStoreGlobal {
  theme: 'light' | 'dark',
  codeDirectory: CodeDirectory,
  currentCodeFile: CodeFile | null,
  entryCodeFilePath: string | null,
}

export const storeGlobal = reactive<IStoreGlobal>({
  theme: 'light',
  codeDirectory: [],
  currentCodeFile: null,
  entryCodeFilePath: null,
})