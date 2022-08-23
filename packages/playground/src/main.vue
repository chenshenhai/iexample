<template>
  <div
    class="iexample-theme iexample-container"
    :class="{
      'iexample-theme-dark': props.theme === 'dark'
    }"
  >
    <ResponsiveLayout :theme="storeGlobal.theme">
      <template #layout-sider>
        <SiderMenu
          :docDirectory="props.docDirectory"
          :currentDocFilePath="props.currentDocFilePath"
          @onSelectDocFile="onSelectDocFile"
        />
      </template>
      <template #layout-center>
        <ViewSwitch :docContent="props.docContent" />
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
import type { PlaygroundTheme, DocDirectory, DocFile } from './types';
import ResponsiveLayout from './modules/responsive-layout.vue';
import LayoutRow from './components/layout-row.vue';
import { storeGlobal } from './store/global';
import SiderMenu from './modules/sider-menu.vue';
import ViewSwitch from './modules/view-switch.vue';

const props = defineProps<{
  theme?: PlaygroundTheme;
  docDirectory?: DocDirectory;
  currentDocFilePath?: string;
  docContent?: string;
}>();

const emits = defineEmits<{
  (event: 'onSelectDocFile', docFile: DocFile): void;
}>();

const onSelectDocFile = (docFile: DocFile) => {
  emits('onSelectDocFile', docFile);
};

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';
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
