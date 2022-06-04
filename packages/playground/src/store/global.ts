import { reactive } from 'vue';

export interface StoreGlobal {
  theme: 'light' | 'dark',
}

export const storeGlobal = reactive<StoreGlobal>({
  theme: 'light',
})