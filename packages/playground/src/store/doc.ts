import { reactive } from 'vue';


export interface StoreDoc {
  docDirectory: DocDirectory,
  selectedDocFilePath: string | null,
  expandAllDocFiles: boolean,
}

export const storeDoc = reactive<StoreDoc>({
  docDirectory: [],
  selectedDocFilePath: null,
  expandAllDocFiles: false,
})