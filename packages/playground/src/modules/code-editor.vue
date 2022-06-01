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

const codeValue = ref<string>(storeGlobal.currentFile?.content || '');
const codeType = ref<ICodeType>(storeGlobal.currentFile?.fileType || 'plaintext');

// watch(() => {
//   return [
//     storeGlobal.currentFile,
//   ]
// }, () => {
//   codeValue.value = storeGlobal.currentFile?.content || '';
//   codeType.value = storeGlobal.currentFile?.fileType || 'plaintext';
// })


watch(() => [storeGlobal.currentFile], () => {
  codeValue.value = storeGlobal.currentFile?.content || '';
  codeType.value = storeGlobal.currentFile?.fileType || 'plaintext';
})

const onChange = debounce((code: string) => {
  for (let i = 0; i < storeGlobal?.directory?.length; i++) {
    if(
      storeGlobal?.directory[i].type === 'file' 
      && storeGlobal?.directory[i]?.path === storeGlobal.currentFile?.path
    ) {
      storeGlobal.directory[i].content = code;
      storeGlobal.currentFile.content = code;
      break;
    }
  }
}, 300)

</script>

<style lang="less">

</style>