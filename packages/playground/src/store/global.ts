import { reactive } from 'vue';

export const storeGlobal = reactive<{
  theme: 'light' | 'dark',
}>({
  theme: 'light'
})