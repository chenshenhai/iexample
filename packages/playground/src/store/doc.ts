import { reactive } from 'vue';
import { DocDirectory, DocFile } from '../types';


export interface StoreDoc {
  docDirectory: DocDirectory,
  selectedDocFilePath: string | null,
  selectedDocFile: DocFile | null,
  expandAllDocFiles: boolean,
  onSelectDocFile: (node: DocFile) => void,
}

export const storeDoc = reactive<StoreDoc>({
  docDirectory: [],
  selectedDocFilePath: null,
  selectedDocFile: null,
  expandAllDocFiles: false,
  onSelectDocFile: () => {},
})