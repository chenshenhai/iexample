import { reactive } from 'vue';


export interface IStoreGlobal {
  theme: 'light' | 'dark',
  directory: IProjectDirectory,
  currentFile: IProjectFile | null,
}

export const storeGlobal = reactive<IStoreGlobal>({
  theme: 'light',
  directory: [],
  currentFile: null,
})