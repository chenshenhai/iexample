<template>
  <div class="iexample iexample-container"
    :class="{
      'iexample-theme-dark': storeGlobal.theme === 'dark',
    }"
  >
    <Header class="iexample-header"></Header>
    <div class="iexample-main">
      <div class="iexample-main-container">
       <code-view />
      </div>
    </div>
    <Footer class="iexample-footer"></Footer>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRaw } from 'vue';
import Header from './modules/header.vue';
import Footer from './modules/footer.vue';
import CodeView from './modules/view.vue';
import { storeGlobal } from './store/global';

const props = defineProps<{
  theme?: IPlaygroundTheme,
  directory?: IProjectDirectory,
  currentFilePath?: string | null,
}>()
const { theme, directory, currentFilePath } = props;

storeGlobal.theme = theme === 'dark' ? 'dark' : 'light';
storeGlobal.directory = Array.isArray(directory) ? directory : [];

if (currentFilePath) {
  for (let i = 0; i < storeGlobal.directory.length; i++) {
    if (storeGlobal.directory[i]?.type === 'file' && storeGlobal.directory[i]?.path === currentFilePath) {
      storeGlobal.currentFile = toRaw(storeGlobal.directory[i]) as IProjectFile;
    }
  }
}

</script>

<style scoped lang="less">
@header-height: 40px;
@footer-height: 30px;


.iexample {
  --iexample-bg: #ffffff;
  --iexample-bg-active: #e6e6e6;
  --iexample-font-color: #555555;
  --iexample-font-color-hover: #222222;
  --iexample-font-color-active: #1277f2;
  
  --iexample-font-family: Monaco, Consolas, monospace, 'Courier New';
  --iexample-border-color: #dddddd;

  &.iexample-theme-dark {
    --iexample-bg: #1a1a1a;
    --iexample-bg-active: #3e3e3e;
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

