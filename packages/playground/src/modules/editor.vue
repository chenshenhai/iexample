<template>
  <code-editor
    :value="storeGlobal?.currentFile?.content"
    :type="storeGlobal?.currentFile?.fileType"
  />
</template>

<script setup lang="ts">
import CodeEditor from '../components/code-editor.vue'
import { storeGlobal } from '../store/global';
</script>

<style lang="less">

</style>