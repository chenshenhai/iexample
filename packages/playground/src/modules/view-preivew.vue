<template>
  <div class="preview-iframe" ref="refDOM"></div>
</template>

<script setup lang="ts">
import { ref, inject, watch, toRaw } from 'vue';
import { ReactProjectCompiler } from '@iexample/compiler';
import { SHARED_CODE_STORE_CONTEXT_KEY } from '../util/constant';
import type { SharedCodeStore, CodeDirectory } from '../types';

const refDOM = ref<HTMLDivElement>();

const sharedCodeStore = inject<SharedCodeStore>(SHARED_CODE_STORE_CONTEXT_KEY);
const reactCompiler = new ReactProjectCompiler();
let iframe: HTMLIFrameElement | null = null;

function generateIFrame(targetCodeDir: CodeDirectory) {
  console.log('targetCodeDir ====', toRaw(targetCodeDir));
  if (iframe) {
    refDOM.value?.removeChild(iframe);
    iframe = null;
  }
  iframe = document.createElement('iframe');
  reactCompiler.setFiles(targetCodeDir);
  const html = reactCompiler.compileFormPage('@/index.html') || '';
  console.log('html ======', html);
  iframe.srcdoc = html;
  refDOM.value?.appendChild(iframe);
}

watch([() => sharedCodeStore?.codeDirectory], ([targetCodeDirectory]) => {
  if (targetCodeDirectory) {
    generateIFrame(targetCodeDirectory);
  }
});
</script>

<style lang="less">
.iexmaple-mod-view-preview {
  .preview-iframe,
  .preview-iframe:deep(iframe) {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #fff;
  }
}
</style>
