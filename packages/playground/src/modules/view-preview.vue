<template>
  <div class="iexmaple-mod-view-preview" ref="refDOM"></div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue';
import {
  ReactProjectCompiler,
  VueSetupProjectCompiler
} from '@iexample/compiler';
import { SHARED_CODE_STORE_CONTEXT_KEY } from '../util/constant';
import type { SharedCodeStore, CodeDirectory, ProjectType } from '../types';

const refDOM = ref<HTMLDivElement>();

const sharedCodeStore = inject<SharedCodeStore>(SHARED_CODE_STORE_CONTEXT_KEY);
const reactCompiler = new ReactProjectCompiler();
const vueSetupCompiler = new VueSetupProjectCompiler();
let currentCompiler: ReactProjectCompiler | VueSetupProjectCompiler =
  reactCompiler;

let iframe: HTMLIFrameElement | null = null;

function generateIFrame(
  targetCodeDir: CodeDirectory,
  targetProjectType?: ProjectType
) {
  if (iframe) {
    refDOM.value?.removeChild(iframe);
    iframe = null;
  }
  if (targetProjectType === 'vue') {
    currentCompiler = vueSetupCompiler;
  } else {
    currentCompiler = reactCompiler;
  }
  iframe = document.createElement('iframe');
  currentCompiler.setFiles(targetCodeDir);
  const html = currentCompiler.compileFormPage('@/index.html') || '';
  iframe.srcdoc = html;
  refDOM.value?.appendChild(iframe);
}

watch(
  [() => sharedCodeStore?.codeDirectory, () => sharedCodeStore?.projectType],
  ([targetCodeDirectory, targetProjectType]) => {
    if (targetCodeDirectory) {
      generateIFrame(targetCodeDirectory, targetProjectType);
    }
  }
);
</script>

<style lang="less">
.iexmaple-mod-view-preview {
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #fff;
  }
}
</style>
