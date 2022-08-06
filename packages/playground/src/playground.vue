<template>
  <div
    class="iexample iexample-container"
    :class="{
      'iexample-theme-dark': storeGlobal.theme === 'dark'
    }"
  >
    <main-header class="iexample-header"></main-header>
    <div class="iexample-main">
      <div class="iexample-main-container">
        <main-view />
      </div>
    </div>
    <main-footer class="iexample-footer"></main-footer>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, watchEffect, reactive } from 'vue';
import MainHeader from './modules/main-header.vue';
import MainFooter from './modules/main-footer.vue';
import MainView from './modules/main-view.vue';
import { storeGlobal } from './store/global';
import { storeCode } from './store/code';
import { storeDoc } from './store/doc';
import { formatDirectory, formatPath } from './util/format';
import { searchFileFormDocDirectory } from './util/file';
import { parseMarkdownProject } from './runtime/markdown/parse';
import type {
  PlaygroundTheme,
  CodeDirectory,
  DocDirectory,
  DocFile,
  CodeFile
} from './types';

const props = defineProps<{
  theme?: PlaygroundTheme;
  currentMarkdown: string;

  currentCodeFilePath?: string | null;
  entryCodeFilePath?: string;

  // doc
  docDirectory?: DocDirectory;
  selectedDocFilePath?: string | null;
  expandAllDocFiles?: boolean;
  onSelectDocFile?: (node: DocFile) => void;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

const refreshStoreCode = () => {
  const projectStore = reactive(parseMarkdownProject(props.currentMarkdown));
  // TODO
  console.log('toRaw(projectStore.dir) =', toRaw(projectStore.dir));

  if (props.currentCodeFilePath) {
    storeCode.currentCodeFilePath = formatPath(
      toRaw(props.currentCodeFilePath)
    );
  }
  if (projectStore.dir) {
    storeCode.codeDirectory = formatDirectory(toRaw(projectStore.dir));
  } else {
    storeCode.codeDirectory = [];
  }
  if (props.entryCodeFilePath) {
    storeCode.entryCodeFilePath = formatPath(toRaw(props.entryCodeFilePath));
  }
  if (storeCode.currentCodeFilePath) {
    for (let i = 0; i < storeCode.codeDirectory.length; i++) {
      if (
        storeCode.codeDirectory[i]?.type === 'file' &&
        storeCode.codeDirectory[i]?.path === storeCode.currentCodeFilePath
      ) {
        storeCode.currentCodeFile = toRaw(
          storeCode.codeDirectory[i]
        ) as CodeFile;
      }
    }
  }
};

// const refreshStoreDoc = () => {
//   if (props.selectedDocFilePath) {
//     storeDoc.selectedDocFilePath = formatPath(toRaw(props.selectedDocFilePath));
//   }
//   if (props.docDirectory) {
//     storeDoc.docDirectory = formatDirectory(toRaw(props.docDirectory));
//   } else {
//     storeDoc.docDirectory = [];
//   }
//   if (typeof props.expandAllDocFiles === 'boolean') {
//     storeDoc.expandAllDocFiles = props.expandAllDocFiles;
//   }
//   if (typeof props.onSelectDocFile === 'function') {
//     storeDoc.onSelectDocFile = props.onSelectDocFile;
//   }

//   storeDoc.selectedDocFile = searchFileFormDocDirectory(
//     toRaw(storeDoc.selectedDocFilePath || ''),
//     toRaw(storeDoc.docDirectory || [])
//   );
// };

watchEffect(() => {
  refreshStoreCode();
  // refreshStoreDoc();
});
</script>

<style scoped lang="less">
@header-height: 30px;
@footer-height: 30px;

.iexample {
  --iexample-bg: #ffffff;
  --iexample-bg-active: #2196f34f;
  --iexample-bg-hover: #e6e6e6;
  --iexample-border-color-active: #2f9df491;

  --iexample-font-color: #555555;
  --iexample-font-color-hover: #222222;
  --iexample-font-color-active: #1277f2;

  --iexample-font-family: Monaco, Consolas, monospace, 'Courier New';
  --iexample-border-color: #dddddd;

  &.iexample-theme-dark {
    --iexample-bg: #1a1a1a;
    // --iexample-bg-active: #3e3e3e;
    // --iexample-bg-active: #2196f34f;
    --iexample-bg-hover: #3e3e3e;
    --iexample-font-color: #aaaaaa;
    --iexample-font-color-hover: #fafafa;
    --iexample-border-color: #383838;
  }

  &.iexample-container {
    height: 100%;
    font-family: var(--iexample-font-family);
    color: var(--iexample-font-color);
    background: var(--iexample-bg);
  }

  .iexample-header {
    position: fixed;
    top: 0;
    z-index: 100;
    height: @header-height;
    width: 100%;
    box-shadow: 0px 0px 10px 0px #8481817a;
    background: var(--iexample-bg);
  }
  .iexample-footer {
    bottom: 0;
    position: fixed;
    z-index: 100;
    height: @footer-height;
    width: 100%;
    box-shadow: 0px 0px 10px 0px #8481817a;
    background: var(--iexample-bg);
  }
  .iexample-main {
    padding-top: @header-height;
    padding-bottom: @footer-height;
    box-sizing: border-box;
    height: 100%;
  }

  .iexample-main-container {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}
</style>
