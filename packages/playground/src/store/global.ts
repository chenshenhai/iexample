import { reactive } from 'vue';


export interface IStoreGlobal {
  theme: 'light' | 'dark',
  directory: IProjectDirectory,
  currentFile: IProjectFile | null,
  entryPath: string | null,
}

export const storeGlobal = reactive<IStoreGlobal>({
  theme: 'light',
  directory: [],
  currentFile: null,
  entryPath: null,
})