import { reactive } from 'vue';

export const storeGlobal = reactive<{
  theme: 'light' | 'dark',
  directory: IProjectDirectory,
  currentFilePath: string | null,
}>({
  theme: 'light',
  directory: [],
  currentFilePath: null,
})