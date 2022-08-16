<template>
  <div
    class="iexample-theme iexample-container"
    :class="{
      'iexample-theme-dark': props.theme === 'dark'
    }"
  >
    <ResponsiveLayout :theme="storeGlobal.theme">
      <template #layout-sider>
        <SiderMenu :docDirectory="props.docDirectory" />
      </template>
      <template #layout-center>
        <div>Code Edit</div>
      </template>
      <template #layout-preview>
        <LayoutRow :defaultTopHeight="50" :unit="'%'">
          <template #top> Preview </template>
          <template #bottom> Console </template>
        </LayoutRow>
      </template>
    </ResponsiveLayout>
  </div>
</template>

<script lang="ts" setup>
import { toRaw } from 'vue';
import type { PlaygroundTheme, DocDirectory } from './types';
import ResponsiveLayout from './modules/responsive-layout.vue';
import LayoutRow from './components/layout-row.vue';
import { storeGlobal } from './store/global';
import SiderMenu from './modules/sider-menu.vue';

const props = defineProps<{
  theme?: PlaygroundTheme;

  // TODO
  docDirectory?: DocDirectory;
  currentDocPath?: string;
  currentDocContent?: string;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

console.log('props.codeDirectory =====', props.docDirectory);
console.log('props.codeDirectory =====', toRaw(props.docDirectory));
</script>

<style scoped lang="less">
.iexample-container {
  font-family: var(--iexample-font-family);
  color: var(--iexample-font-color);
  background: var(--iexample-bg);

  height: 100vh;
  overflow: auto;
}
</style>
