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
          :codeDirectory="sharedCodeStore.codeDirectory"
          :currentCodeFilePath="sharedCodeStore.currentCodeFilePath || ''"
          @onSelectDocFile="onSelectDocFile"
          @onSelectCodeFile="onSelectCodeFile"
        />
      </template>
      <template #layout-center>
        <ViewSwitch
          :docContent="props.docContent"
          :codeContent="sharedCodeStore.codeContent || ''"
          :codeType="sharedCodeStore.codeType"
        />
      </template>
      <template #layout-preview>
        <LayoutRow :defaultTopHeight="50" :unit="'%'">
          <template #top>
            <ViewPreview />
          </template>
          <template #bottom> Console </template>
        </LayoutRow>
      </template>
    </ResponsiveLayout>
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive, provide, onMounted } from 'vue';
import type {
  PlaygroundTheme,
  DocDirectory,
  DocFile,
  CodeFile,
  SharedStore,
  SharedCodeStore
} from './types';
import ResponsiveLayout from './modules/responsive-layout.vue';
import LayoutRow from './components/layout-row.vue';
import { storeGlobal } from './store/global';
import SiderMenu from './modules/sider-menu.vue';
import ViewSwitch from './modules/view-switch.vue';
import ViewPreview from './modules/view-preview.vue';
import { parseMarkdownProject } from './runtime/markdown/parse';
import { createSharedStore, createSharedCodeStore } from './store/shared';
import {
  SHARED_STORE_CONTEXT_KEY,
  SHARED_CODE_STORE_CONTEXT_KEY
} from './util/constant';

const props = defineProps<{
  theme?: PlaygroundTheme;
  docDirectory?: DocDirectory;
  currentDocFilePath?: string;
  docContent?: string;
}>();

const sharedStore = reactive<SharedStore>(createSharedStore());
const sharedCodeStore = reactive<SharedCodeStore>(createSharedCodeStore());

provide<SharedStore>(SHARED_STORE_CONTEXT_KEY, sharedStore);
provide<SharedCodeStore>(SHARED_CODE_STORE_CONTEXT_KEY, sharedCodeStore);

const emits = defineEmits<{
  (event: 'onSelectDocFile', docFile: DocFile): void;
}>();

const onSelectDocFile = (docFile: DocFile) => {
  emits('onSelectDocFile', docFile);
};

const onSelectCodeFile = (codeFile: CodeFile) => {
  sharedCodeStore.currentCodeFilePath = codeFile.path;
  sharedCodeStore.codeContent = codeFile.content;
  sharedCodeStore.codeType = codeFile.codeType;
};

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

function resetCode(docContent?: string) {
  const codeProject = parseMarkdownProject(docContent || '');
  console.log('codeProject ========', codeProject);

  sharedCodeStore.codeDirectory = codeProject.dir;
  sharedCodeStore.projectType = codeProject.projectType;
}

onMounted(() => {
  resetCode(props.docContent);
});

watch([() => props.docContent], ([docContent]) => {
  sharedStore.docMode = 'markdown';
  resetCode(docContent);
  sharedCodeStore.codeContent = null;
  sharedCodeStore.currentCodeFilePath = null;
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
