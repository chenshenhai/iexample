<template>
  <div class="iexample-mod-list">
    <file-tree
      :directory="storeGlobal.codeDirectory"
      :currentFilePath="storeGlobal.currentCodeFile?.path || null"
      :onSelect="onSelect"
    />
  </div>
</template>

<script lang="ts" setup >
import { toRaw } from 'vue';
import FileTree from '../components/file-tree.vue';
import { storeGlobal } from '../store/global';

const onSelect = (data: CodeFile | CodeFolder) => {
  if (data.type === 'file') {
    storeGlobal.currentCodeFile = toRaw(data)
  }
}

</script>

<style lang="less" scoped>
.iexample-mod-list {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>