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
          :codeDirectory="storeCode.codeDirectory"
          :currentCodeFilePath="storeCode.currentCodeFilePath || ''"
          @onSelectDocFile="onSelectDocFile"
          @onSelectCodeFile="onSelectCodeFile"
        />
      </template>
      <template #layout-center>
        <ViewSwitch
          :docContent="props.docContent"
          :codeContent="storeCode.codeContent || ''"
          :codeType="storeCode.codeType"
        />
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
import { watch } from 'vue';
import type { PlaygroundTheme, DocDirectory, DocFile, CodeFile } from './types';
import ResponsiveLayout from './modules/responsive-layout.vue';
import LayoutRow from './components/layout-row.vue';
import { storeGlobal } from './store/global';
import SiderMenu from './modules/sider-menu.vue';
import ViewSwitch from './modules/view-switch.vue';
import { parseMarkdownProject } from './runtime/markdown/parse';
import { storeCode } from './store/code';

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

const onSelectCodeFile = (codeFile: CodeFile) => {
  storeCode.currentCodeFilePath = codeFile.path;
  storeCode.codeContent = codeFile.content;
  storeCode.codeType = codeFile.codeType;
};

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

watch([() => props.docContent], ([docContent]) => {
  const codeProject = parseMarkdownProject(docContent || '');
  storeCode.codeDirectory = codeProject.dir;
});
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
