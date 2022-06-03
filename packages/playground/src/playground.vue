<template>
  <div class="iexample iexample-container"
    :class="{
      'iexample-theme-dark': storeGlobal.theme === 'dark',
    }"
  >
    <main-nav class="iexample-header"></main-nav>
    <div class="iexample-main">
      <div class="iexample-main-container">
       <main-view />
      </div>
    </div>
    <Footer class="iexample-footer"></Footer>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, reactive, watchEffect } from 'vue';
import MainNav from './modules/main-nav.vue';
import Footer from './modules/footer.vue';
import MainView from './modules/main-view.vue';
import { storeGlobal } from './store/global';
import { formatDirectory, formatPath } from './util/format';

const props = defineProps<{
  theme?: PlaygroundTheme,
  codeDirectory?: CodeDirectory,
  currentCodeFilePath?: string | null,
  entryCodeFilePath?: string,
}>();
const state = reactive<{
  theme?: PlaygroundTheme,
  codeDirectory?: CodeDirectory,
  currentCodeFilePath?: string | null,
  entryCodeFilePath?: string,
}>({})

watchEffect(() => {
  state.theme = props.theme;
  if (props.currentCodeFilePath) {
    state.currentCodeFilePath = formatPath(toRaw(props.currentCodeFilePath));
  }
  if (props.codeDirectory) {
    state.codeDirectory = formatDirectory(toRaw(props.codeDirectory));
  }
  if (props.entryCodeFilePath) {
    state.entryCodeFilePath = formatPath(toRaw(props.entryCodeFilePath));
  }
  storeGlobal.entryCodeFilePath = state.entryCodeFilePath;
  storeGlobal.theme = state.theme === 'dark' ? 'dark' : 'light';
  storeGlobal.codeDirectory = Array.isArray(state.codeDirectory) ? state.codeDirectory : [];
  if (state.currentCodeFilePath) {
    for (let i = 0; i < storeGlobal.codeDirectory.length; i++) {
      if (storeGlobal.codeDirectory[i]?.type === 'file' && storeGlobal.codeDirectory[i]?.path === state.currentCodeFilePath) {
        storeGlobal.currentCodeFile = toRaw(storeGlobal.codeDirectory[i]) as CodeFile;
      }
    }
  }
  console.log(toRaw(storeGlobal))
})

</script>

<style scoped lang="less">
@header-height: 40px;
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

