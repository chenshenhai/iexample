<template>
  <code-editor
    :value="codeValue"
    :type="codeType"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CodeEditor from '../components/code-editor.vue'
import { storeGlobal } from '../store/global';
import { debounce } from '../util/time'

const codeValue = ref<string>(storeGlobal.currentCodeFile?.content || '');
const codeType = ref<CodeType>(storeGlobal.currentCodeFile?.fileType || 'plaintext');


watch(() => [storeGlobal.currentCodeFile], () => {
  codeValue.value = storeGlobal.currentCodeFile?.content || '';
  codeType.value = storeGlobal.currentCodeFile?.fileType || 'plaintext';
})

const onChange = debounce((code: string) => {
  for (let i = 0; i < storeGlobal?.codeDirectory?.length; i++) {
    if(
      storeGlobal?.codeDirectory[i].type === 'file' 
      && storeGlobal?.codeDirectory[i]?.path === storeGlobal.currentCodeFile?.path
    ) {
      storeGlobal.codeDirectory[i].content = code;
      storeGlobal.currentCodeFile.content = code;
      break;
    }
  }
}, 300)

</script>

<style lang="less">

</style>